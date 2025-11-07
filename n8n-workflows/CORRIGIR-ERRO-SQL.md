# 🔧 Como Corrigir Erro ao Criar Tabela no Supabase

## ❌ Erro Comum

```
Error: Failed to run sql query:
ERROR: 42601: syntax error at end of input
LINE 0: ^
```

## ✅ Solução Rápida

### Opção 1: Use o Arquivo Simplificado (RECOMENDADO)

1. Abra o Supabase
2. Vá em **SQL Editor**
3. Copie APENAS este código:

```sql
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
```

4. Clique em **RUN**
5. Pronto! ✅

---

## 🎯 Solução Completa (Passo a Passo)

### PASSO 1: Criar a Tabela Principal

Copie e cole no SQL Editor:

```sql
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
```

Clique em **RUN** ✅

---

### PASSO 2: Criar Índices (Opcional mas Recomendado)

Depois que o PASSO 1 funcionar, execute:

```sql
CREATE INDEX IF NOT EXISTS idx_leads_telefone ON leads(telefone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_data_extracao ON leads(data_extracao);
```

Clique em **RUN** ✅

---

### PASSO 3: Criar Tabela de Conversas (Opcional)

Se quiser guardar histórico de conversas, execute:

```sql
CREATE TABLE IF NOT EXISTS conversas_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  mensagem TEXT NOT NULL,
  tipo TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status_entrega TEXT,
  metadata JSONB
);
```

Clique em **RUN** ✅

---

### PASSO 4: Desabilitar RLS (Para Testes)

Para facilitar os testes iniciais, desabilite a segurança RLS:

```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

Clique em **RUN** ✅

**IMPORTANTE**: Depois que validar que está funcionando, você pode habilitar o RLS novamente se precisar de segurança.

---

## 🔍 Por Que Deu Erro?

O Supabase pode ter problemas com:

1. **Scripts muito longos**: Múltiplas operações de uma vez
2. **Políticas RLS complexas**: Com auth.uid()
3. **Comentários em lugares específicos**: Alguns editores não gostam
4. **Caracteres especiais**: Aspas ou quebras de linha
5. **Views com GROUP BY complexos**: Alguns não funcionam no primeiro run

---

## ✅ Como Verificar se Funcionou

### Método 1: Table Editor

1. No Supabase, vá em **Table Editor**
2. Você deve ver a tabela **leads** na lista
3. Clique nela
4. Deve mostrar as colunas criadas

### Método 2: SQL Query

Execute esta query:

```sql
SELECT * FROM leads LIMIT 5;
```

Se retornar "Success. No rows returned" = Funcionou! ✅

Se retornar erro "relation leads does not exist" = Tabela não foi criada ❌

---

## 🧪 Testar Manualmente

Depois de criar a tabela, teste inserindo um registro:

```sql
INSERT INTO leads (nome_empresa, telefone, fonte)
VALUES ('Teste Restaurante', '11999887766', 'teste manual');
```

Depois busque:

```sql
SELECT * FROM leads;
```

Se aparecer o registro, está tudo certo! ✅

Para apagar o teste:

```sql
DELETE FROM leads WHERE telefone = '11999887766';
```

---

## 🚨 Erros Comuns e Soluções

### Erro: "relation leads already exists"

**Solução**: A tabela já existe! Você pode:

1. Usar a tabela existente (nada a fazer)
2. Apagar e recriar:

```sql
DROP TABLE IF EXISTS leads CASCADE;
```

Depois execute o PASSO 1 novamente.

---

### Erro: "permission denied"

**Solução**: Use a **service_role_key** ao invés da anon_key no N8N.

---

### Erro: "policy error" ou "RLS"

**Solução**: Desabilite o RLS:

```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE conversas_leads DISABLE ROW LEVEL SECURITY;
```

---

### Erro: "syntax error near 'COMMENT'"

**Solução**: Ignore os comentários. Execute apenas os CREATE TABLE.

---

## 📝 Estrutura Mínima Funcional

Se nada funcionar, use esta versão ULTRA simplificada:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_empresa TEXT,
  telefone TEXT,
  endereco TEXT,
  status TEXT DEFAULT 'novo',
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

Depois você pode adicionar as outras colunas manualmente pelo Table Editor.

---

## 🎯 Checklist de Troubleshooting

Antes de pedir ajuda:

- [ ] Tentou usar apenas o PASSO 1 (CREATE TABLE)?
- [ ] Verificou se a tabela já existe?
- [ ] Está usando o SQL Editor do Supabase?
- [ ] Copiou e colou exatamente o código?
- [ ] Clicou no botão RUN?
- [ ] Esperou a execução terminar?
- [ ] Verificou no Table Editor se a tabela aparece?

---

## 🆘 Ainda não Funcionou?

### Método Alternativo: Criar pela Interface

1. No Supabase, vá em **Table Editor**
2. Clique em **New Table**
3. Nome: `leads`
4. Adicione as colunas manualmente:
   - `id` → type: uuid → default: gen_random_uuid()
   - `nome_empresa` → type: text
   - `telefone` → type: text → unique: ✅
   - `endereco` → type: text
   - `status` → type: text → default: 'novo'
   - `created_at` → type: timestamptz → default: now()

5. Desabilite RLS
6. Salve

---

## 📊 Verificação Final

Execute esta query para ver a estrutura da tabela:

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'leads'
ORDER BY ordinal_position;
```

Deve retornar a lista de todas as colunas.

---

## ✅ Quando Estiver Funcionando

1. Vá para o N8N
2. Configure as credenciais do Supabase
3. Execute o workflow
4. Verifique se os leads estão sendo salvos:
   - Supabase → Table Editor → leads

---

## 💡 Dicas

1. **Comece simples**: Crie apenas a tabela básica primeiro
2. **Adicione gradualmente**: Índices e outras tabelas depois
3. **Teste sempre**: Insira um registro manual para testar
4. **Desabilite RLS**: Para desenvolvimento/testes
5. **Use service_role_key**: No N8N para ter permissões completas

---

## 📁 Arquivos Disponíveis

- `supabase-schema-simple.sql` - Versão simplificada ✅
- `supabase-schema-passo-a-passo.sql` - Versão completa dividida em passos
- `supabase-schema.sql` - Versão original (pode dar erro)

**Use o arquivo `supabase-schema-simple.sql` primeiro!**

---

## 🎉 Pronto!

Se seguiu todos os passos e a tabela foi criada, você está pronto para usar o workflow!

Se ainda tiver problemas, me envie:
1. A mensagem de erro completa
2. O código SQL que você executou
3. Uma screenshot do erro (se possível)

Vou te ajudar! 😊
