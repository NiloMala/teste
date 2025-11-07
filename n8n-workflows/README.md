# 🚀 Workflow N8N - Geração de Leads para Empresas Locais

Este workflow automatiza completamente o processo de encontrar pequenas empresas locais, extrair contatos e fazer o primeiro contato via WhatsApp.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Personalização](#personalização)
- [Boas Práticas](#boas-práticas)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

### O que este workflow faz?

1. **Busca empresas locais** usando Google Maps API (via SerpAPI)
2. **Extrai informações** como nome, telefone, endereço, avaliações
3. **Filtra contatos** válidos com telefone
4. **Salva no Supabase** para gerenciamento de leads
5. **Envia mensagem personalizada** via WhatsApp automaticamente
6. **Registra todo o histórico** de contatos

### Fluxo do Processo

```
Trigger Manual
    ↓
Configurar Parâmetros de Busca
    ↓
Buscar no Google Maps ← (Busca Alternativa)
    ↓
Combinar Resultados
    ↓
Processar e Extrair Dados
    ↓
Filtrar Contatos com Telefone
    ↓
Salvar no Supabase
    ↓
Criar Mensagem Personalizada
    ↓
Aguardar (Anti-Spam)
    ↓
Enviar WhatsApp
    ↓
Atualizar Status
```

---

## 🔧 Pré-requisitos

### Serviços Necessários

1. **N8N** (self-hosted ou cloud)
   - Versão: 1.0.0+
   - [Instalar N8N](https://docs.n8n.io/hosting/)

2. **Supabase** (banco de dados)
   - Conta gratuita disponível
   - [Criar conta Supabase](https://supabase.com)

3. **Evolution API** (WhatsApp)
   - Para envio de mensagens
   - [Documentação Evolution API](https://doc.evolution-api.com/)

4. **SerpAPI** (opcional mas recomendado)
   - Para buscas no Google Maps
   - [Criar conta SerpAPI](https://serpapi.com/)
   - Plano gratuito: 100 buscas/mês

---

## 📦 Instalação

### Passo 1: Importar o Workflow

1. Abra seu N8N
2. Clique em **"Workflows"** → **"Import from File"**
3. Selecione o arquivo `local-business-lead-generation.json`
4. O workflow será importado com todos os nós configurados

### Passo 2: Configurar Banco de Dados

1. Acesse seu projeto no Supabase
2. Vá em **"SQL Editor"**
3. Cole o conteúdo do arquivo `supabase-schema.sql`
4. Execute o script
5. Verifique se as tabelas foram criadas:
   - `leads`
   - `conversas_leads`
   - `leads_stats` (view)

### Passo 3: Verificar Instalação

Execute os comandos SQL para verificar:

```sql
-- Verificar tabelas criadas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Verificar estrutura da tabela leads
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'leads';
```

---

## ⚙️ Configuração

### 1. Configurar Credenciais no N8N

#### Supabase

1. No N8N, vá em **"Credentials"** → **"New"**
2. Selecione **"Supabase API"**
3. Preencha:
   - **Name**: `Supabase account`
   - **Host**: `https://seu-projeto.supabase.co`
   - **Service Role Secret**: Cole a service_role_key do Supabase
     - Encontre em: Supabase → Settings → API → service_role key

#### Evolution API (WhatsApp)

1. No N8N, vá em **"Credentials"** → **"New"**
2. Selecione **"Http Header Auth"**
3. Preencha:
   - **Name**: `Evolution API`
   - **Header Name**: `apikey`
   - **Header Value**: Sua API key da Evolution API

#### SerpAPI (opcional)

1. No N8N, vá em **"Credentials"** → **"New"**
2. Selecione **"SerpAPI"**
3. Preencha:
   - **Name**: `SerpAPI`
   - **API Key**: Sua chave de API do SerpAPI

### 2. Configurar Variáveis de Ambiente

No N8N, configure as seguintes variáveis:

```env
EVOLUTION_INSTANCE=nome-da-sua-instancia
```

### 3. Personalizar Parâmetros de Busca

No nó **"Configurações de Busca"**, ajuste:

```javascript
{
  "cidade": "São Paulo",          // Sua cidade
  "estado": "SP",                  // Seu estado
  "nicho": "restaurantes pequenos", // Nicho alvo
  "palavrasChave": "restaurante, lanchonete, pizzaria",
  "maxResultados": 20              // Quantidade de leads
}
```

### 4. Personalizar Mensagem WhatsApp

No nó **"Criar Mensagem WhatsApp"**, edite o template:

```javascript
const mensagem = `Olá! 👋

Meu nome é [SEU NOME] e trabalho com automação de processos e atendimento via WhatsApp para empresas locais.

Notei que ${empresa.nomeEmpresa} é um negócio muito bem avaliado aqui na região! 🌟

Você já pensou em automatizar:
✅ Agendamentos
✅ Pedidos
✅ Atendimento ao cliente
✅ Follow-up de vendas

Posso te mostrar como isso pode economizar tempo e aumentar suas vendas?

Tenho cases de sucesso com empresas similares. Posso te enviar alguns exemplos?`;
```

---

## 🎮 Como Usar

### Execução Manual

1. Abra o workflow no N8N
2. Clique no nó **"Trigger Manual"**
3. Clique em **"Execute Node"**
4. O workflow começará a executar

### Execução Automática (Agendada)

1. Substitua o nó **"Trigger Manual"** por **"Schedule Trigger"**
2. Configure a frequência:
   - Diariamente às 9h
   - Semanalmente
   - Mensalmente

Exemplo de configuração:

```javascript
// Executar toda segunda-feira às 9h
{
  "rule": "0 9 * * 1"
}
```

### Monitoramento

1. **Ver execuções**: N8N → Executions
2. **Ver leads**: Supabase → Table Editor → leads
3. **Ver conversas**: Supabase → Table Editor → conversas_leads

---

## 🎨 Personalização

### Filtros Avançados

Adicione um nó **"IF"** após **"Processar e Extrair Dados"** para filtrar:

```javascript
// Apenas empresas com avaliação > 4.0
{{ $json.avaliacao >= 4.0 }}

// Apenas empresas com mais de 10 avaliações
{{ $json.totalAvaliacoes > 10 }}

// Apenas empresas abertas
{{ $json.horarios !== 'Fechado' }}
```

### Múltiplos Nichos

Clone o nó **"Configurações de Busca"** para buscar múltiplos nichos:

```javascript
// Nicho 1: Restaurantes
{ "palavrasChave": "restaurante, lanchonete" }

// Nicho 2: Salões de Beleza
{ "palavrasChave": "salão de beleza, barbearia" }

// Nicho 3: Lojas
{ "palavrasChave": "loja de roupas, boutique" }
```

### Mensagens A/B Testing

Crie variações de mensagens para testar:

```javascript
const mensagens = [
  "Versão 1: Mais formal",
  "Versão 2: Mais casual",
  "Versão 3: Com oferta especial"
];

const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
```

---

## ✅ Boas Práticas

### 1. Respeite Limites de API

- **SerpAPI**: 100 buscas/mês (plano gratuito)
- **WhatsApp**: Evite enviar muitas mensagens rapidamente
- **Configuração recomendada**: 5-10 segundos entre mensagens

### 2. Evite Spam

```javascript
// No nó "Aguardar (Anti-Spam)"
// Aumentar para 10-15 segundos
amount: 15
unit: "seconds"
```

### 3. Horário de Envio

Configure para enviar apenas em horários comerciais:

```javascript
const hora = new Date().getHours();
const diaUtil = new Date().getDay(); // 0=Domingo, 6=Sábado

if (hora < 9 || hora > 18 || diaUtil === 0 || diaUtil === 6) {
  return []; // Não enviar fora do horário comercial
}
```

### 4. Limite Diário

Adicione um contador para limitar envios:

```javascript
// No nó "Code"
const maxEnviosDia = 50;
const contador = $workflow.staticData.contadorDiario || 0;

if (contador >= maxEnviosDia) {
  throw new Error('Limite diário atingido');
}

$workflow.staticData.contadorDiario = contador + 1;
```

### 5. Backup de Dados

Configure backup automático no Supabase:

```sql
-- Criar backup mensal
CREATE TABLE leads_backup AS
SELECT * FROM leads
WHERE data_extracao >= DATE_TRUNC('month', CURRENT_DATE);
```

---

## 🔍 Troubleshooting

### Problema: Nenhum resultado encontrado

**Solução**:
1. Verifique as credenciais do SerpAPI
2. Teste a busca manualmente no Google Maps
3. Ajuste as palavras-chave
4. Tente uma cidade diferente

### Problema: Erro ao enviar WhatsApp

**Solução**:
1. Verifique se a Evolution API está online
2. Verifique se a instância está conectada
3. Teste o endpoint manualmente:

```bash
curl -X POST https://api.evolutionapi.com/message/sendText/SUA_INSTANCIA \
  -H "apikey: SUA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "5511999999999",
    "text": "Teste"
  }'
```

### Problema: Erro ao salvar no Supabase

**Solução**:
1. Verifique as credenciais
2. Verifique se as tabelas existem
3. Verifique as políticas RLS:

```sql
-- Desabilitar RLS temporariamente para teste
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Testar insert manual
INSERT INTO leads (nome_empresa, telefone, fonte)
VALUES ('Teste', '11999999999', 'manual');
```

### Problema: Telefones inválidos

**Solução**:
Adicione validação extra no nó "Processar e Extrair Dados":

```javascript
// Validar formato brasileiro
const telefoneRegex = /^55\d{10,11}$/;
if (!telefoneRegex.test(telefone)) {
  continue; // Pular este lead
}
```

### Problema: Mensagens sendo marcadas como spam

**Solução**:
1. Aumente o intervalo entre mensagens (15-30 segundos)
2. Varie o texto das mensagens
3. Envie menos mensagens por dia (max 30-50)
4. Use uma conta Business verificada

---

## 📊 Métricas e Analytics

### Query para Ver Estatísticas

```sql
-- Estatísticas gerais
SELECT
  COUNT(*) as total_leads,
  COUNT(CASE WHEN status = 'contatado' THEN 1 END) as contatados,
  COUNT(CASE WHEN status = 'respondeu' THEN 1 END) as responderam,
  ROUND(
    COUNT(CASE WHEN status = 'respondeu' THEN 1 END)::NUMERIC /
    NULLIF(COUNT(CASE WHEN status = 'contatado' THEN 1 END), 0) * 100,
    2
  ) as taxa_resposta_percentual
FROM leads;

-- Por fonte
SELECT
  fonte,
  COUNT(*) as total,
  AVG(avaliacao) as media_avaliacao
FROM leads
GROUP BY fonte
ORDER BY total DESC;

-- Por dia
SELECT
  DATE(data_extracao) as data,
  COUNT(*) as leads_dia
FROM leads
GROUP BY DATE(data_extracao)
ORDER BY data DESC;
```

---

## 🚀 Próximos Passos

### Melhorias Futuras

1. **Integração com CRM**
   - Adicionar nó para Pipedrive, HubSpot, etc.

2. **AI para Mensagens**
   - Usar OpenAI para personalizar mensagens

3. **Validação de Telefones**
   - Integrar com API de validação

4. **Respostas Automáticas**
   - Webhook para capturar respostas do WhatsApp
   - Fluxo de follow-up automático

5. **Dashboard**
   - Criar dashboard no projeto React
   - Visualizar métricas em tempo real

---

## 📞 Suporte

### Recursos

- **Documentação N8N**: https://docs.n8n.io
- **Documentação Supabase**: https://supabase.com/docs
- **Documentação Evolution API**: https://doc.evolution-api.com

### Comunidade

- **N8N Community**: https://community.n8n.io
- **Discord Evolution API**: https://discord.gg/evolutionapi

---

## ⚠️ Avisos Legais

1. **Conformidade com LGPD**: Este workflow coleta dados públicos. Certifique-se de:
   - Ter base legal para processamento
   - Oferecer opt-out
   - Manter política de privacidade

2. **Termos de Serviço**: Respeite os termos de:
   - Google Maps
   - WhatsApp Business
   - APIs utilizadas

3. **Anti-Spam**:
   - Não envie mensagens não solicitadas em massa
   - Ofereça sempre opção de descadastro
   - Respeite horários comerciais

---

## 📝 Licença

Este workflow é fornecido "como está" para fins educacionais. Use por sua conta e risco.

---

**Desenvolvido com ❤️ para ajudar pequenos negócios a encontrar seus clientes!**
