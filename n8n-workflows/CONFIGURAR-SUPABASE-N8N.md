# 🗄️ Como Configurar os Nós do Supabase no N8N

## 📊 Visão Geral

O workflow usa **2 nós do Supabase**:

1. **"Salvar no Supabase"** → INSERT (adicionar novos leads)
2. **"Atualizar Status no Supabase"** → UPDATE (atualizar status após contato)

Ambos usam a **mesma tabela**: `leads`

---

## 🎯 Nó 1: "Salvar no Supabase"

### Localização no Workflow
```
... → Filtrar com Telefone → [Salvar no Supabase] → Criar Mensagem WhatsApp → ...
```

### Configuração do Nó

**Clique no nó "Salvar no Supabase"** e configure:

#### Resource
```
Resource: Table Row
```

#### Operation
```
Operation: Insert
```

#### Table
```
Table: leads
```

#### Columns
```
Mapping Mode: Define Below

Mapeamento:
┌────────────────────────────────────────────────────┐
│ nome_empresa     = {{ $json.nomeEmpresa }}         │
│ endereco         = {{ $json.endereco }}            │
│ telefone         = {{ $json.telefone }}            │
│ website          = {{ $json.website }}             │
│ tipo             = {{ $json.tipo }}                │
│ avaliacao        = {{ $json.avaliacao }}           │
│ total_avaliacoes = {{ $json.totalAvaliacoes }}     │
│ fonte            = {{ $json.fonte }}               │
│ status           = novo                            │
│ data_extracao    = {{ $json.dataExtracao }}        │
└────────────────────────────────────────────────────┘
```

#### Options
```
Skip On Conflict: ✅ true
```

**IMPORTANTE**: Isso evita erros se o telefone já existir no banco!

---

## 🔄 Nó 2: "Atualizar Status no Supabase"

### Localização no Workflow
```
... → Enviar WhatsApp → [Atualizar Status no Supabase]
```

### Configuração do Nó

**Clique no nó "Atualizar Status no Supabase"** e configure:

#### Resource
```
Resource: Table Row
```

#### Operation
```
Operation: Update
```

#### Table
```
Table: leads
```

#### Update Key
```
Update Key: telefone
```

**IMPORTANTE**: Isso identifica qual registro atualizar!

#### Columns
```
Mapping Mode: Define Below

Mapeamento:
┌────────────────────────────────────────────────────┐
│ status                 = contatado                 │
│ data_primeiro_contato  = {{ new Date().toISOString() }} │
│ resposta_whatsapp      = {{ $json.response }}      │
└────────────────────────────────────────────────────┘
```

---

## 📋 Passo a Passo Visual

### Configurar Nó "Salvar no Supabase"

```
1. Clique no nó "Salvar no Supabase"

2. No painel lateral:
   ┌─────────────────────────────────────┐
   │ Supabase                            │
   │                                     │
   │ Resource: [Table Row      ▼]       │
   │ Operation: [Insert        ▼]       │
   │ Table: [leads            ▼]  ← AQUI│
   │                                     │
   │ Columns:                            │
   │   Mapping Mode: Define Below        │
   │                                     │
   │   [+ Add Column]                    │
   │                                     │
   │   Column Name: nome_empresa         │
   │   Column Value: ={{$json.nomeEmpresa}}│
   │                                     │
   │   Column Name: telefone             │
   │   Column Value: ={{$json.telefone}} │
   │                                     │
   │   ... (outros campos)               │
   │                                     │
   │ Options:                            │
   │   Skip On Conflict: ✅              │
   │                                     │
   │ [Save]                              │
   └─────────────────────────────────────┘
```

### Configurar Nó "Atualizar Status no Supabase"

```
1. Clique no nó "Atualizar Status no Supabase"

2. No painel lateral:
   ┌─────────────────────────────────────┐
   │ Supabase                            │
   │                                     │
   │ Resource: [Table Row      ▼]       │
   │ Operation: [Update        ▼]       │
   │ Table: [leads            ▼]  ← AQUI│
   │ Update Key: [telefone    ▼]        │
   │                                     │
   │ Columns:                            │
   │   Mapping Mode: Define Below        │
   │                                     │
   │   Column Name: status               │
   │   Column Value: contatado           │
   │                                     │
   │   Column Name: data_primeiro_contato│
   │   Column Value: ={{new Date().toISOString()}}│
   │                                     │
   │ [Save]                              │
   └─────────────────────────────────────┘
```

---

## 🗂️ Tabelas do Supabase

### Tabela Principal: `leads`

Esta é a **ÚNICA** tabela que você precisa configurar nos nós!

#### Colunas Usadas

| Coluna | Tipo | Usado em | Descrição |
|--------|------|----------|-----------|
| `id` | UUID | Automático | Gerado automaticamente |
| `nome_empresa` | TEXT | INSERT | Nome da empresa |
| `endereco` | TEXT | INSERT | Endereço completo |
| `telefone` | TEXT | INSERT/UPDATE | Telefone (chave única) |
| `website` | TEXT | INSERT | Site da empresa |
| `tipo` | TEXT | INSERT | Tipo de negócio |
| `avaliacao` | NUMERIC | INSERT | Nota no Google (0-5) |
| `total_avaliacoes` | INTEGER | INSERT | Quantidade de avaliações |
| `fonte` | TEXT | INSERT | De onde veio o lead |
| `status` | TEXT | INSERT/UPDATE | Status do lead |
| `data_extracao` | TIMESTAMP | INSERT | Quando foi extraído |
| `data_primeiro_contato` | TIMESTAMP | UPDATE | Quando foi contatado |
| `resposta_whatsapp` | JSONB | UPDATE | Resposta da API |

### Tabela Opcional: `conversas_leads`

Esta tabela **NÃO é usada no workflow atual**, mas você pode usar para guardar histórico de conversas.

---

## ✅ Checklist de Configuração

### Antes de Executar

- [ ] Tabela `leads` criada no Supabase
- [ ] Credenciais do Supabase configuradas no N8N
- [ ] Nó "Salvar no Supabase" aponta para tabela `leads`
- [ ] Nó "Salvar no Supabase" tem "Skip On Conflict" ativado
- [ ] Nó "Atualizar Status no Supabase" aponta para tabela `leads`
- [ ] Nó "Atualizar Status no Supabase" usa `telefone` como Update Key

---

## 🔍 Como Verificar se Está Correto

### Teste 1: Ver a Configuração

1. Clique no nó "Salvar no Supabase"
2. Verifique se **Table** = `leads`
3. Verifique se **Operation** = `Insert`

### Teste 2: Executar o Workflow

1. Execute o workflow
2. Vá no Supabase → Table Editor → `leads`
3. Deve aparecer os leads salvos

### Teste 3: Ver os Dados

```sql
SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;
```

Deve retornar os leads mais recentes.

---

## 🚨 Erros Comuns

### Erro: "Table 'leads' does not exist"

**Solução**: Criar a tabela no Supabase primeiro!

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_empresa TEXT,
  telefone TEXT UNIQUE,
  status TEXT DEFAULT 'novo',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Erro: "Permission denied"

**Solução**:
1. Desabilite RLS:
```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

2. Use a **service_role_key** nas credenciais do N8N (não a anon key)

### Erro: "Column does not exist"

**Solução**: Verifique se digitou o nome da coluna corretamente:
- ✅ `nome_empresa` (com underscore)
- ❌ `nomeEmpresa` (sem underscore)

### Erro: "Duplicate key value violates unique constraint"

**Solução**: O telefone já existe no banco. Isso é normal!

Configure "Skip On Conflict" = ✅ para evitar este erro.

---

## 🎯 Configuração Rápida

### Se quiser apenas testar, configure assim:

#### Nó "Salvar no Supabase"
```
Table: leads
Operation: Insert
Columns (mínimo):
  - nome_empresa = {{ $json.nomeEmpresa }}
  - telefone = {{ $json.telefone }}
  - status = novo
Skip On Conflict: ✅
```

#### Nó "Atualizar Status no Supabase"
```
Table: leads
Operation: Update
Update Key: telefone
Columns:
  - status = contatado
```

---

## 📊 Fluxo de Dados

### O que acontece:

```
1. Buscar Empresas
   ↓
2. Extrair Dados
   ↓
3. [Salvar no Supabase] ← INSERT em "leads"
   ↓ (Salva: nome, telefone, endereço, etc.)
   ↓
4. Criar Mensagem WhatsApp
   ↓
5. Enviar WhatsApp
   ↓
6. [Atualizar Status no Supabase] ← UPDATE em "leads"
   ↓ (Atualiza: status, data_primeiro_contato)
```

---

## 🗺️ Mapa de Colunas

### De onde vêm os dados:

| Coluna no Supabase | Vem de onde | Exemplo |
|-------------------|-------------|---------|
| `nome_empresa` | Google Maps | "Pizzaria do João" |
| `telefone` | Google Maps | "11999887766" |
| `endereco` | Google Maps | "Rua ABC, 123" |
| `avaliacao` | Google Maps | 4.5 |
| `status` | Fixo | "novo" |
| `data_extracao` | Automático | 2025-01-07T12:00:00Z |

---

## 💡 Dicas

1. **Sempre use a tabela `leads`** em ambos os nós
2. **Skip On Conflict** evita erros de duplicação
3. **Update Key = telefone** identifica qual registro atualizar
4. **Teste com poucos leads** primeiro (3-5)
5. **Verifique no Supabase** após cada execução

---

## 🆘 Precisa de Ajuda?

Se aparecer erro ao salvar no Supabase:

1. Verifique se a tabela existe
2. Verifique se RLS está desabilitado
3. Verifique se está usando service_role_key
4. Teste inserir manualmente no Supabase
5. Me envie a mensagem de erro completa

---

## ✅ Resumo

**AMBOS os nós usam:**
- **Tabela**: `leads`
- **Credenciais**: Supabase account (com service_role_key)

**Diferença**:
- **Nó 1**: INSERT (adiciona novos)
- **Nó 2**: UPDATE (atualiza existentes)

**Pronto! É só isso que você precisa configurar!** 🎉
