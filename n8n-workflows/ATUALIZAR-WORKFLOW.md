# 🔧 Como Atualizar o Workflow no N8N

## 🐛 Problema Corrigido

O campo `maxResultados` não estava funcionando - sempre buscava 20 resultados independente do valor configurado.

**Agora está corrigido!** O workflow vai respeitar o valor que você configurar.

---

## ✅ Como Aplicar a Correção

### Opção 1: Reimportar o Workflow Completo (RECOMENDADO)

1. **Salve suas configurações personalizadas** (anote cidade, palavras-chave, mensagem)
2. **Delete o workflow antigo** no N8N
3. **Importe novamente** o arquivo `local-business-lead-generation.json` atualizado
4. **Reconfigure** suas personalizações
5. **Teste** com `maxResultados: 2`

---

### Opção 2: Editar Manualmente o Nó (Rápido)

Se preferir não reimportar, edite manualmente:

1. **Abra o workflow** no N8N
2. **Clique no nó** "Processar e Extrair Dados"
3. **Substitua o código** JavaScript completo por este:

```javascript
// Processa e extrai informações das empresas encontradas
const items = [];

// Pegar o valor de maxResultados da configuração
const maxResultados = $('Configurações de Busca').first().json.maxResultados || 20;

for (const item of $input.all()) {
  const data = item.json;

  // Se vier do SerpAPI (Google Maps)
  if (data.local_results) {
    for (const result of data.local_results.slice(0, maxResultados)) {
      items.push({
        json: {
          nomeEmpresa: result.title || 'N/A',
          endereco: result.address || 'N/A',
          telefone: result.phone || '',
          website: result.website || '',
          tipo: result.type || 'Negócio Local',
          avaliacao: result.rating || 0,
          totalAvaliacoes: result.reviews || 0,
          horarios: result.hours || 'N/A',
          googleMapsLink: result.link || '',
          fonte: 'Google Maps',
          dataExtracao: new Date().toISOString()
        }
      });
    }
  }

  // Se vier de busca HTML alternativa
  if (data.body && typeof data.body === 'string') {
    // Extração básica com regex (simplificada)
    const phoneRegex = /\(?\d{2}\)?\s?\d{4,5}-?\d{4}/g;
    const phones = data.body.match(phoneRegex) || [];

    // Limitar também a busca alternativa
    for (let i = 0; i < Math.min(phones.length, maxResultados); i++) {
      items.push({
        json: {
          telefone: phones[i],
          fonte: 'Web Scraping',
          dataExtracao: new Date().toISOString()
        }
      });
    }
  }
}

return items.length > 0 ? items : [{ json: { erro: 'Nenhum resultado encontrado' } }];
```

4. **Clique em Save**
5. **Execute o workflow** para testar

---

## 🎯 Como Testar se Funcionou

### Teste 1: Com 2 resultados

1. No nó "Configurações de Busca", configure:
```json
{
  "maxResultados": 2
}
```

2. Execute o workflow
3. Verifique o nó "Processar e Extrair Dados"
4. Deve mostrar **no máximo 2 items** ✅

### Teste 2: Com 5 resultados

1. Mude para:
```json
{
  "maxResultados": 5
}
```

2. Execute novamente
3. Deve mostrar **no máximo 5 items** ✅

---

## 🔍 O Que Foi Mudado

### Antes (ERRADO):
```javascript
// Estava fixo em 20
for (const result of data.local_results.slice(0, 20)) {
```

### Depois (CORRETO):
```javascript
// Agora pega o valor da configuração
const maxResultados = $('Configurações de Busca').first().json.maxResultados || 20;
for (const result of data.local_results.slice(0, maxResultados)) {
```

---

## 📊 Valores Recomendados para maxResultados

| Situação | Valor Sugerido |
|----------|----------------|
| **Teste inicial** | 2-5 |
| **Validação** | 10 |
| **Produção** | 20-30 |
| **Campanha grande** | 50-100 |

---

## 💡 Dicas

1. **Sempre teste com 2-5** primeiro
2. **O SerpAPI cobra por busca**, não por resultado - então o valor máximo que você pode ter depende do plano
3. **Nem todos os resultados terão telefone** - então se buscar 10, pode receber apenas 3-4 com telefone
4. **Use valores baixos** para economizar créditos da API

---

## 🚨 Troubleshooting

### Ainda está buscando 20 mesmo depois da correção

**Solução**:
1. Limpe o cache do N8N (Settings → Clear execution data)
2. Recarregue a página
3. Execute novamente

### Erro: "Cannot read property 'maxResultados'"

**Solução**:
Verifique se o nó "Configurações de Busca" existe e tem o campo `maxResultados` configurado.

### Nenhum resultado retornado

**Solução**:
Seu `maxResultados` pode estar muito baixo. Aumente para 10-20.

---

## ✅ Checklist Pós-Atualização

- [ ] Workflow reimportado OU código editado manualmente
- [ ] Configurações personalizadas restauradas
- [ ] Credenciais reconectadas (se reimportou)
- [ ] Testado com `maxResultados: 2`
- [ ] Verificado que retorna no máximo 2 resultados
- [ ] Testado com valor maior (10-20)
- [ ] Workflow salvo

---

## 📝 Observação Importante

Se você **reimportar o workflow**, vai precisar **reconfigurar**:

1. ✅ Credenciais (Supabase, Evolution API, SerpAPI)
2. ✅ Cidade e nicho
3. ✅ Mensagem personalizada do WhatsApp
4. ✅ Variáveis de ambiente

**Anote tudo antes de deletar o workflow antigo!**

---

## 🎉 Pronto!

Agora o `maxResultados` funciona corretamente!

Configure para **2** para fazer testes rápidos, depois aumente gradualmente. 🚀
