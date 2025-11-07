-- ============================================
-- PASSO A PASSO - Execute na ordem!
-- ============================================

-- PASSO 1: Criar tabela leads
-- Copie e cole no SQL Editor, depois clique em RUN
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

-- ============================================
-- PASSO 2: Criar índices
-- Copie e cole depois que o PASSO 1 funcionar
-- ============================================
CREATE INDEX IF NOT EXISTS idx_leads_telefone ON leads(telefone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_data_extracao ON leads(data_extracao);

-- ============================================
-- PASSO 3: Criar tabela de conversas
-- Copie e cole depois que o PASSO 2 funcionar
-- ============================================
CREATE TABLE IF NOT EXISTS conversas_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  mensagem TEXT NOT NULL,
  tipo TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status_entrega TEXT,
  metadata JSONB
);

-- ============================================
-- PASSO 4: Índices para conversas
-- Copie e cole depois que o PASSO 3 funcionar
-- ============================================
CREATE INDEX IF NOT EXISTS idx_conversas_lead_id ON conversas_leads(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversas_timestamp ON conversas_leads(timestamp);

-- ============================================
-- PASSO 5: Trigger de updated_at
-- Copie e cole depois que o PASSO 4 funcionar
-- ============================================
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

-- ============================================
-- PASSO 6: Desabilitar RLS (Opcional - para testes)
-- Se você quiser usar sem autenticação durante os testes
-- Copie e cole depois que o PASSO 5 funcionar
-- ============================================
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE conversas_leads DISABLE ROW LEVEL SECURITY;

-- ============================================
-- PASSO 7 (ALTERNATIVO): Habilitar RLS com políticas permissivas
-- OU use este se precisar de segurança básica
-- NÃO execute junto com o PASSO 6!
-- ============================================

-- Descomente as linhas abaixo se quiser RLS ativo:

-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE conversas_leads ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Permitir tudo em leads" ON leads FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Permitir tudo em conversas" ON conversas_leads FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- PASSO 8: View de estatísticas (Opcional)
-- Copie e cole por último
-- ============================================
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
