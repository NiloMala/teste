# ⚡ Guia de Início Rápido

Comece a gerar leads em **15 minutos**!

## 🎯 Pré-requisitos Mínimos

- [ ] Conta no N8N (gratuito)
- [ ] Conta no Supabase (gratuito)
- [ ] Evolution API configurada (para WhatsApp)
- [ ] 15 minutos do seu tempo

## 📝 Passo a Passo

### Passo 1: Configure o Supabase (5 min)

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Crie um novo projeto ou use um existente
3. Vá em **SQL Editor**
4. Cole o conteúdo de `supabase-schema.sql`
5. Clique em **RUN**
6. Pronto! ✅

### Passo 2: Importe o Workflow (2 min)

1. Acesse seu N8N
2. Clique em **Workflows** → **Add workflow** → **Import from File**
3. Selecione `local-business-lead-generation.json`
4. Clique em **Import**
5. Pronto! ✅

### Passo 3: Configure as Credenciais (5 min)

#### A. Supabase

1. No N8N, clique em **Credentials** → **Add credential**
2. Busque por "Supabase"
3. Preencha:
   ```
   Name: Supabase account
   Host: [Cole a URL do seu projeto Supabase]
   Service Role Key: [Cole a service_role_key]
   ```
4. Para pegar a Service Role Key:
   - Supabase → Settings → API → `service_role` (secret)
5. Clique em **Save** ✅

#### B. Evolution API

1. No N8N, clique em **Credentials** → **Add credential**
2. Busque por "Header Auth"
3. Preencha:
   ```
   Name: Evolution API
   Header Name: apikey
   Header Value: [Sua API key da Evolution]
   ```
4. Clique em **Save** ✅

#### C. SerpAPI (OPCIONAL)

Se quiser usar (recomendado para melhores resultados):

1. Crie conta grátis em [serpapi.com](https://serpapi.com)
2. Copie sua API key
3. No N8N: **Credentials** → **Add credential** → "SerpApi"
4. Cole a key e salve ✅

### Passo 4: Personalize sua Busca (2 min)

1. Abra o workflow importado
2. Clique no nó **"Configurações de Busca"**
3. Edite:
   ```json
   {
     "cidade": "SUA CIDADE",
     "estado": "SEU ESTADO",
     "nicho": "restaurantes pequenos",
     "palavrasChave": "restaurante, lanchonete",
     "maxResultados": 10
   }
   ```
4. Salve ✅

### Passo 5: Personalize a Mensagem (1 min)

1. Clique no nó **"Criar Mensagem WhatsApp"**
2. Encontre este trecho e edite:
   ```javascript
   const mensagem = `Olá! 👋

   Meu nome é SEU NOME...`;
   ```
3. Substitua **SEU NOME** pelo seu nome
4. Ajuste a mensagem como preferir
5. Salve ✅

## 🚀 Primeira Execução

### IMPORTANTE: Teste Primeiro!

1. No nó **"Configurações de Busca"**, configure:
   ```json
   {
     "maxResultados": 3
   }
   ```

2. Clique em **Execute Workflow**

3. Acompanhe a execução:
   - Verde = Sucesso ✅
   - Vermelho = Erro ❌

4. Verifique no Supabase:
   - Vá em **Table Editor** → **leads**
   - Veja se os leads foram salvos

5. Verifique o WhatsApp:
   - As mensagens foram enviadas?
   - Estão chegando corretamente?

### Se tudo funcionou:

1. Ajuste `maxResultados` para 20-50
2. Execute novamente
3. Monitore as respostas no WhatsApp

## ⚠️ Troubleshooting Rápido

### "Erro ao conectar ao Supabase"
- Verifique se a URL está correta
- Verifique se a service_role_key está correta
- Teste a conexão no próprio Supabase

### "Erro ao enviar WhatsApp"
- Verifique se a Evolution API está online
- Teste o endpoint manualmente
- Verifique se a instância está conectada

### "Nenhum resultado encontrado"
- Tente palavras-chave diferentes
- Tente uma cidade diferente
- Se não usar SerpAPI, os resultados são limitados

### "Mensagens sendo marcadas como spam"
- Reduza a quantidade de envios
- Aumente o intervalo entre mensagens
- Varie o texto das mensagens

## 📊 Próximos Passos

Depois de testar e validar:

1. **Configure execução automática**
   - Substitua o trigger manual por Schedule
   - Configure para rodar 1x por semana

2. **Monitore métricas**
   - Taxa de resposta
   - Leads qualificados
   - Conversões

3. **Otimize a mensagem**
   - Teste variações (A/B testing)
   - Ajuste baseado nas respostas

4. **Expanda para outros nichos**
   - Clone o workflow
   - Ajuste para outros tipos de negócio

## 🎓 Recursos Adicionais

- `README.md` - Documentação completa
- `exemplos-configuracao.md` - Exemplos práticos
- `supabase-schema.sql` - Schema do banco
- `.env.example` - Variáveis de ambiente

## 💬 Dicas de Ouro

1. **Comece pequeno**: Teste com 5-10 contatos
2. **Seja educado**: Sempre ofereça opt-out
3. **Respeite horários**: Não envie fora do horário comercial
4. **Personalize**: Ajuste a mensagem para cada nicho
5. **Monitore**: Acompanhe métricas e ajuste

## ✅ Checklist Final

Antes de usar em produção:

- [ ] Testei com poucos contatos (3-5)
- [ ] Mensagens chegaram corretamente
- [ ] Leads salvos no Supabase
- [ ] Mensagem personalizada
- [ ] Intervalo anti-spam configurado (10s+)
- [ ] Opt-out incluído na mensagem
- [ ] Horário comercial respeitado
- [ ] Backups configurados

## 🎉 Está Pronto!

Se chegou até aqui, você já tem:
✅ Workflow funcionando
✅ Leads sendo capturados
✅ Mensagens sendo enviadas
✅ Tudo automatizado

**Boa sorte nas vendas! 🚀**

---

**Dúvidas?** Consulte o README.md completo ou a documentação oficial do N8N.
