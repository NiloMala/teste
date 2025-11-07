-- Tabela para armazenar leads capturados
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_empresa TEXT NOT NULL,
  endereco TEXT,
  telefone TEXT UNIQUE NOT NULL,
  website TEXT,
  tipo TEXT,
  avaliacao NUMERIC(2,1),
  total_avaliacoes INTEGER,
  horarios TEXT,
  google_maps_link TEXT,
  fonte TEXT,
  status TEXT DEFAULT 'novo',
  data_extracao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_primeiro_contato TIMESTAMP WITH TIME ZONE,
  resposta_whatsapp JSONB,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_leads_telefone ON leads(telefone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_data_extracao ON leads(data_extracao);

-- Tabela para histórico de conversas
CREATE TABLE IF NOT EXISTS conversas_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  mensagem TEXT NOT NULL,
  tipo TEXT NOT NULL, -- 'enviada' ou 'recebida'
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status_entrega TEXT, -- 'enviada', 'entregue', 'lida', 'erro'
  metadata JSONB
);

-- Índice para histórico de conversas
CREATE INDEX IF NOT EXISTS idx_conversas_lead_id ON conversas_leads(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversas_timestamp ON conversas_leads(timestamp);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversas_leads ENABLE ROW LEVEL SECURITY;

-- Política para usuários autenticados poderem ler e escrever seus próprios leads
CREATE POLICY "Usuários podem ver seus próprios leads"
  ON leads FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Usuários podem inserir leads"
  ON leads FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Usuários podem atualizar seus próprios leads"
  ON leads FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Políticas para conversas
CREATE POLICY "Usuários podem ver conversas de seus leads"
  ON conversas_leads FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Usuários podem inserir conversas"
  ON conversas_leads FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- View para estatísticas de leads
CREATE OR REPLACE VIEW leads_stats AS
SELECT
  COUNT(*) as total_leads,
  COUNT(CASE WHEN status = 'novo' THEN 1 END) as novos,
  COUNT(CASE WHEN status = 'contatado' THEN 1 END) as contatados,
  COUNT(CASE WHEN status = 'respondeu' THEN 1 END) as responderam,
  COUNT(CASE WHEN status = 'interessado' THEN 1 END) as interessados,
  COUNT(CASE WHEN status = 'convertido' THEN 1 END) as convertidos,
  COUNT(CASE WHEN status = 'nao_interessado' THEN 1 END) as nao_interessados,
  AVG(avaliacao) as media_avaliacoes,
  fonte,
  DATE_TRUNC('day', data_extracao) as dia
FROM leads
GROUP BY fonte, DATE_TRUNC('day', data_extracao);

COMMENT ON TABLE leads IS 'Tabela para armazenar leads de empresas locais capturados automaticamente';
COMMENT ON TABLE conversas_leads IS 'Histórico de conversas via WhatsApp com os leads';
COMMENT ON VIEW leads_stats IS 'Estatísticas agregadas dos leads por fonte e data';
