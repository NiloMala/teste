# 📚 Exemplos de Configuração

## Nichos Populares

### 1. Restaurantes e Food Service

```javascript
{
  "cidade": "São Paulo",
  "estado": "SP",
  "nicho": "estabelecimentos de alimentação",
  "palavrasChave": "restaurante, lanchonete, pizzaria, hamburgeria, cafeteria, padaria"
}
```

**Mensagem sugerida**:
```
Olá! 👋

Vi que o ${nomeEmpresa} tem ótimas avaliações no Google! 🍕

Você sabia que muitos restaurantes estão aumentando as vendas em até 40% com:
✅ Cardápio digital automatizado
✅ Pedidos direto pelo WhatsApp
✅ Sistema de agendamento de mesas
✅ Programa de fidelidade automático

Posso te mostrar como isso funciona? É mais simples do que parece! 😊
```

---

### 2. Salões de Beleza e Barbearias

```javascript
{
  "cidade": "Rio de Janeiro",
  "estado": "RJ",
  "nicho": "salões e barbearias",
  "palavrasChave": "salão de beleza, barbearia, nail designer, estética, spa"
}
```

**Mensagem sugerida**:
```
Oi! 💇‍♀️

Percebi que o ${nomeEmpresa} tem uma clientela fiel aqui na região!

Você já pensou em automatizar seus agendamentos? Muitos salões estão:
✅ Reduzindo faltas em 60%
✅ Agendando 24/7 sem precisar atender telefone
✅ Enviando lembretes automáticos
✅ Gerenciando lista de espera

Quer ver como funciona na prática?
```

---

### 3. Lojas de Varejo

```javascript
{
  "cidade": "Belo Horizonte",
  "estado": "MG",
  "nicho": "varejo local",
  "palavrasChave": "loja de roupas, boutique, loja de calçados, acessórios, papelaria"
}
```

**Mensagem sugerida**:
```
Olá! 👋

Vi a ${nomeEmpresa} e achei muito interessante!

Muitas lojas locais estão crescendo com:
✅ Catálogo digital no WhatsApp
✅ Notificações de novidades e promoções
✅ Sistema de pedidos e reservas
✅ Programa de cashback automático

Posso te enviar exemplos de lojas que dobraram suas vendas?
```

---

### 4. Academias e Estúdios

```javascript
{
  "cidade": "Curitiba",
  "estado": "PR",
  "nicho": "fitness e bem-estar",
  "palavrasChave": "academia, crossfit, pilates, yoga, personal trainer, estúdio"
}
```

**Mensagem sugerida**:
```
E aí! 💪

Vi que a ${nomeEmpresa} tem excelentes avaliações!

Academias parceiras estão tendo ótimos resultados com:
✅ Agendamento de aulas automático
✅ Controle de presença digital
✅ Cobrança recorrente automatizada
✅ Lembretes de treinos

Quer saber como isso pode ajudar a reter mais alunos?
```

---

### 5. Serviços Automotivos

```javascript
{
  "cidade": "Porto Alegre",
  "estado": "RS",
  "nicho": "serviços automotivos",
  "palavrasChave": "oficina mecânica, lava jato, funilaria, borracharia, auto center"
}
```

**Mensagem sugerida**:
```
Olá! 🚗

Notei que a ${nomeEmpresa} é bem avaliada aqui na região!

Muitas oficinas estão otimizando o atendimento com:
✅ Agendamento de revisões online
✅ Orçamentos automáticos por WhatsApp
✅ Notificações de status do serviço
✅ Histórico digital do veículo

Posso te mostrar como funciona?
```

---

### 6. Clínicas e Consultórios

```javascript
{
  "cidade": "Brasília",
  "estado": "DF",
  "nicho": "saúde e bem-estar",
  "palavrasChave": "clínica odontológica, consultório médico, fisioterapia, psicologia"
}
```

**Mensagem sugerida**:
```
Olá! 👨‍⚕️

Vi que a ${nomeEmpresa} atende muito bem a região!

Clínicas estão melhorando a experiência do paciente com:
✅ Agendamento online 24/7
✅ Lembretes automáticos de consultas
✅ Confirmação de presença
✅ Histórico médico digital

Reduz faltas em até 70%! Quer saber mais?
```

---

### 7. Pet Shops e Veterinárias

```javascript
{
  "cidade": "Florianópolis",
  "estado": "SC",
  "nicho": "pet care",
  "palavrasChave": "pet shop, veterinária, banho e tosa, hotel para pets"
}
```

**Mensagem sugerida**:
```
Oi! 🐾

A ${nomeEmpresa} tem ótimas avaliações dos tutores!

Muitos pet shops estão crescendo com:
✅ Agendamento de banho e tosa online
✅ Lembretes de vacinas e vermífugos
✅ Programa de fidelidade automático
✅ Cardápio digital de produtos

Quer ver exemplos de sucesso?
```

---

## 🎯 Estratégias de Segmentação

### Por Avaliação

```javascript
// Filtrar apenas empresas bem avaliadas
if ($json.avaliacao >= 4.5 && $json.totalAvaliacoes >= 50) {
  // Lead qualificado
}
```

### Por Horário de Funcionamento

```javascript
// Filtrar empresas que abrem tarde (podem precisar de automação)
const horarios = $json.horarios;
if (horarios.includes('10:00') || horarios.includes('11:00')) {
  // Possível lead
}
```

### Por Quantidade de Avaliações

```javascript
// Empresas estabelecidas mas ainda pequenas
if ($json.totalAvaliacoes >= 20 && $json.totalAvaliacoes <= 200) {
  // Sweet spot - não muito pequena, não muito grande
}
```

---

## 📱 Variações de Mensagens

### Estilo Consultivo

```javascript
const mensagem = `Olá!

Notei que ${empresa.nomeEmpresa} tem ${empresa.totalAvaliacoes} avaliações positivas.

Estou fazendo uma pesquisa sobre desafios de gestão em ${empresa.tipo}.

Posso te fazer 3 perguntas rápidas sobre:
1. Agendamentos
2. Atendimento ao cliente
3. Controle de vendas

Em troca, te envio um relatório gratuito com soluções! Topa?`;
```

### Estilo Social Proof

```javascript
const mensagem = `Oi!

Trabalho com ${empresa.tipo} aqui na região.

Recentemente, ajudei:
• Pizzaria do João - 35% mais pedidos
• Salão da Maria - 60% menos faltas
• Oficina do Pedro - 2x mais clientes

Todas empresas pequenas como ${empresa.nomeEmpresa}.

Posso te mostrar como?`;
```

### Estilo Problema-Solução

```javascript
const mensagem = `Olá!

Pergunta rápida: ${empresa.nomeEmpresa} perde muito tempo:

❌ Atendendo telefone pra agendamento?
❌ Lidando com clientes que não aparecem?
❌ Respondendo as mesmas perguntas no WhatsApp?

Se respondeu SIM pra alguma... tenho uma solução simples pra te mostrar! 😊`;
```

### Estilo Oferta Especial

```javascript
const mensagem = `Oi! 👋

Estou ajudando ${empresa.tipo} aqui em ${config.cidade} a automatizarem o atendimento.

PROMOÇÃO ESPECIAL:
✅ Setup grátis
✅ 30 dias de teste
✅ Suporte incluído

Só pra empresas locais como ${empresa.nomeEmpresa}!

Válido até sexta. Interessado(a)?`;
```

---

## 🤖 Automações Avançadas

### Follow-up Automático

Adicione após o nó "Atualizar Status no Supabase":

```javascript
// Aguardar 3 dias
const TRES_DIAS = 3 * 24 * 60 * 60 * 1000;

// Verificar se não respondeu
const ultimoContato = new Date($json.data_primeiro_contato);
const agora = new Date();
const diferenca = agora - ultimoContato;

if (diferenca >= TRES_DIAS && $json.status === 'contatado') {
  // Enviar follow-up
  const followUp = `Oi! Tudo bem?

  Enviei uma mensagem há alguns dias sobre automação para ${nomeEmpresa}.

  Sem pressão! Só queria saber se teve chance de ver?

  Se não for o momento certo, sem problemas! 😊`;

  return { mensagem: followUp };
}
```

### Qualificação de Leads

```javascript
// Sistema de pontuação
let score = 0;

if ($json.avaliacao >= 4.5) score += 30;
if ($json.totalAvaliacoes >= 50) score += 20;
if ($json.totalAvaliacoes <= 200) score += 10;
if ($json.website) score += 15;
if ($json.horarios !== 'Fechado') score += 25;

$json.leadScore = score;
$json.prioridade = score >= 70 ? 'alta' : score >= 50 ? 'media' : 'baixa';
```

### Horário Inteligente

```javascript
// Enviar no melhor horário baseado no tipo de negócio
const horaIdeal = {
  'restaurante': 15, // 15h (entre almoço e jantar)
  'salão': 11,       // 11h (antes do rush)
  'academia': 14,     // 14h (tarde)
  'loja': 10,        // 10h (início do dia)
  'default': 10
};

const tipo = $json.tipo.toLowerCase();
const horaEnvio = horaIdeal[tipo] || horaIdeal.default;

const agora = new Date().getHours();
if (agora !== horaEnvio) {
  // Agendar para o horário ideal
  const delay = (horaEnvio - agora) * 60 * 60 * 1000;
  return { delay };
}
```

---

## 📊 Queries SQL Úteis

### Dashboard de Performance

```sql
-- Taxa de conversão por nicho
SELECT
  tipo,
  COUNT(*) as total_leads,
  COUNT(CASE WHEN status IN ('respondeu', 'interessado', 'convertido') THEN 1 END) as engajados,
  ROUND(
    COUNT(CASE WHEN status IN ('respondeu', 'interessado', 'convertido') THEN 1 END)::NUMERIC /
    COUNT(*)::NUMERIC * 100, 2
  ) as taxa_engajamento
FROM leads
GROUP BY tipo
ORDER BY taxa_engajamento DESC;
```

### Melhores Horários de Resposta

```sql
-- Analisar horários com mais respostas
SELECT
  EXTRACT(HOUR FROM data_primeiro_contato) as hora,
  COUNT(*) as total_enviados,
  COUNT(CASE WHEN status = 'respondeu' THEN 1 END) as responderam,
  ROUND(
    COUNT(CASE WHEN status = 'respondeu' THEN 1 END)::NUMERIC /
    COUNT(*)::NUMERIC * 100, 2
  ) as taxa_resposta
FROM leads
WHERE data_primeiro_contato IS NOT NULL
GROUP BY EXTRACT(HOUR FROM data_primeiro_contato)
ORDER BY taxa_resposta DESC;
```

### Leads para Follow-up

```sql
-- Leads que foram contatados há 3+ dias e não responderam
SELECT
  nome_empresa,
  telefone,
  data_primeiro_contato,
  CURRENT_DATE - DATE(data_primeiro_contato) as dias_sem_resposta
FROM leads
WHERE status = 'contatado'
  AND data_primeiro_contato < CURRENT_DATE - INTERVAL '3 days'
ORDER BY data_primeiro_contato ASC
LIMIT 20;
```

---

## 🔒 Segurança e Compliance

### Adicionar Opt-out

```javascript
// No final da mensagem
const mensagem = `${mensagemPrincipal}

---
Para não receber mais mensagens, responda: SAIR`;

// Criar workflow para processar respostas
if (respostaUsuario.toLowerCase().includes('sair')) {
  // Adicionar à blacklist
  await supabase
    .from('blacklist')
    .insert({ telefone: telefone });

  // Atualizar status
  await supabase
    .from('leads')
    .update({ status: 'opt_out' })
    .eq('telefone', telefone);
}
```

### LGPD Compliance

```sql
-- Criar tabela de consentimento
CREATE TABLE consentimentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telefone TEXT UNIQUE NOT NULL,
  consentiu BOOLEAN DEFAULT false,
  data_consentimento TIMESTAMP WITH TIME ZONE,
  ip_origem TEXT,
  origem TEXT, -- 'whatsapp', 'website', 'formulário'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de blacklist
CREATE TABLE blacklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telefone TEXT UNIQUE NOT NULL,
  motivo TEXT,
  data_adicao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verificar antes de enviar
SELECT * FROM blacklist WHERE telefone = '5511999999999';
```

---

## 🚀 Otimizações de Performance

### Cache de Resultados

```javascript
// Evitar buscar mesma empresa duas vezes
const jaExiste = await supabase
  .from('leads')
  .select('telefone')
  .eq('telefone', telefone)
  .single();

if (jaExiste) {
  console.log('Lead já existe, pulando...');
  return null;
}
```

### Batch Processing

```javascript
// Processar em lotes de 10
const BATCH_SIZE = 10;
const items = $input.all();

for (let i = 0; i < items.length; i += BATCH_SIZE) {
  const batch = items.slice(i, i + BATCH_SIZE);

  await Promise.all(
    batch.map(item => processarLead(item))
  );

  // Aguardar entre batches
  await sleep(5000);
}
```

---

**💡 Dica**: Teste sempre com poucos contatos primeiro! Comece com 5-10 leads e ajuste conforme os resultados.
