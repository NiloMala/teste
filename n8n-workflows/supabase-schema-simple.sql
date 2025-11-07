-- ============================================
-- VERSÃO SIMPLES - Execute este primeiro!
-- ============================================

-- 1. Criar tabela de leads
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
