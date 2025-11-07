# 🎯 Como Configurar Cidade e Nicho - Guia Prático

## 📍 Configuração Rápida

### Método 1: Dentro do N8N (Recomendado)

Depois de importar o workflow:

1. **Abra o workflow** no N8N
2. **Localize o nó** chamado **"Configurações de Busca"** (é o segundo nó do workflow)
3. **Clique no nó** para abrir as configurações
4. Você verá algo assim:

```json
{
  "cidade": "São Paulo",
  "estado": "SP",
  "nicho": "restaurantes pequenos",
  "palavrasChave": "restaurante, lanchonete, pizzaria, hamburgeria",
  "maxResultados": 20
}
```

5. **Edite os valores**:

#### Para sua cidade:
```json
{
  "cidade": "SUA_CIDADE_AQUI",
  "estado": "SEU_ESTADO_AQUI"
}
```

#### Para seu nicho:
```json
{
  "nicho": "descrição do nicho",
  "palavrasChave": "palavra1, palavra2, palavra3"
}
```

6. **Clique em "Save"** ou "Salvar"

---

## 🏙️ Exemplos de Configuração por Cidade

### Exemplo 1: Rio de Janeiro - Salões de Beleza

```json
{
  "cidade": "Rio de Janeiro",
  "estado": "RJ",
  "nicho": "salões de beleza e barbearias",
  "palavrasChave": "salão de beleza, barbearia, cabeleireiro, manicure, pedicure",
  "maxResultados": 20
}
```

### Exemplo 2: Belo Horizonte - Clínicas

```json
{
  "cidade": "Belo Horizonte",
  "estado": "MG",
  "nicho": "clínicas e consultórios",
  "palavrasChave": "clínica odontológica, dentista, consultório médico, fisioterapia",
  "maxResultados": 20
}
```

### Exemplo 3: Curitiba - Academias

```json
{
  "cidade": "Curitiba",
  "estado": "PR",
  "nicho": "academias e fitness",
  "palavrasChave": "academia, crossfit, pilates, yoga, personal trainer",
  "maxResultados": 20
}
```

### Exemplo 4: Porto Alegre - Restaurantes

```json
{
  "cidade": "Porto Alegre",
  "estado": "RS",
  "nicho": "estabelecimentos de alimentação",
  "palavrasChave": "restaurante, lanchonete, pizzaria, hamburgeria, cafeteria",
  "maxResultados": 20
}
```

### Exemplo 5: Brasília - Pet Shops

```json
{
  "cidade": "Brasília",
  "estado": "DF",
  "nicho": "serviços para pets",
  "palavrasChave": "pet shop, veterinária, banho e tosa, hotel para pets",
  "maxResultados": 20
}
```

---

## 🎨 Nichos Populares - Lista Completa

### Saúde e Bem-Estar

```json
// Clínicas Odontológicas
{
  "nicho": "clínicas odontológicas",
  "palavrasChave": "clínica odontológica, dentista, ortodontia, implante dentário"
}

// Clínicas Médicas
{
  "nicho": "clínicas e consultórios médicos",
  "palavrasChave": "clínica médica, consultório, médico, pediatra, cardiologista"
}

// Fisioterapia
{
  "nicho": "clínicas de fisioterapia",
  "palavrasChave": "fisioterapia, fisioterapeuta, reabilitação, rpg"
}

// Psicologia
{
  "nicho": "consultórios de psicologia",
  "palavrasChave": "psicólogo, psicóloga, terapia, atendimento psicológico"
}
```

### Beleza e Estética

```json
// Salões de Beleza
{
  "nicho": "salões de beleza",
  "palavrasChave": "salão de beleza, cabeleireiro, manicure, pedicure, depilação"
}

// Barbearias
{
  "nicho": "barbearias",
  "palavrasChave": "barbearia, barbeiro, barber shop, corte masculino"
}

// Estética
{
  "nicho": "clínicas de estética",
  "palavrasChave": "estética, esteticista, spa, massagem, drenagem linfática"
}

// Nail Designer
{
  "nicho": "nail designer e manicure",
  "palavrasChave": "nail designer, manicure, unhas decoradas, alongamento de unhas"
}
```

### Alimentação

```json
// Restaurantes
{
  "nicho": "restaurantes",
  "palavrasChave": "restaurante, comida caseira, self service, buffet"
}

// Fast Food
{
  "nicho": "lanchonetes e fast food",
  "palavrasChave": "lanchonete, hamburgeria, pizzaria, hot dog, açaí"
}

// Cafeterias
{
  "nicho": "cafeterias e confeitarias",
  "palavrasChave": "cafeteria, café, confeitaria, doces, bolos"
}

// Padarias
{
  "nicho": "padarias",
  "palavrasChave": "padaria, panificadora, pães, salgados"
}
```

### Fitness

```json
// Academias
{
  "nicho": "academias",
  "palavrasChave": "academia, musculação, spinning, funcional"
}

// CrossFit
{
  "nicho": "boxes de crossfit",
  "palavrasChave": "crossfit, cross fit, box, treino funcional"
}

// Pilates e Yoga
{
  "nicho": "estúdios de pilates e yoga",
  "palavrasChave": "pilates, yoga, alongamento, mat pilates"
}

// Personal Trainer
{
  "nicho": "personal trainers",
  "palavrasChave": "personal trainer, personal, treinamento personalizado"
}
```

### Varejo

```json
// Lojas de Roupas
{
  "nicho": "lojas de roupas",
  "palavrasChave": "loja de roupas, boutique, moda feminina, moda masculina"
}

// Calçados
{
  "nicho": "lojas de calçados",
  "palavrasChave": "loja de calçados, sapatos, tênis, sandálias"
}

// Papelaria
{
  "nicho": "papelarias",
  "palavrasChave": "papelaria, material escolar, livraria, artigos para escritório"
}

// Lojas de Presentes
{
  "nicho": "lojas de presentes",
  "palavrasChave": "loja de presentes, presentes, decoração, utilidades"
}
```

### Automotivo

```json
// Oficinas Mecânicas
{
  "nicho": "oficinas mecânicas",
  "palavrasChave": "oficina mecânica, mecânico, conserto de carro, revisão"
}

// Lava Jatos
{
  "nicho": "lava jatos",
  "palavrasChave": "lava jato, lavagem de carro, polimento, cristalização"
}

// Auto Center
{
  "nicho": "auto centers",
  "palavrasChave": "auto center, pneus, alinhamento, balanceamento"
}

// Funilaria
{
  "nicho": "funilarias e pintura",
  "palavrasChave": "funilaria, pintura automotiva, lataria, martelinho de ouro"
}
```

### Pets

```json
// Pet Shops
{
  "nicho": "pet shops",
  "palavrasChave": "pet shop, ração, produtos para pets, acessórios para animais"
}

// Veterinárias
{
  "nicho": "clínicas veterinárias",
  "palavrasChave": "veterinária, veterinário, clínica veterinária, consulta pet"
}

// Banho e Tosa
{
  "nicho": "banho e tosa",
  "palavrasChave": "banho e tosa, pet grooming, tosa de cachorro"
}

// Hotel para Pets
{
  "nicho": "hotéis e creches para pets",
  "palavrasChave": "hotel para cachorro, creche para pets, hospedagem animal"
}
```

### Educação

```json
// Escolas de Idiomas
{
  "nicho": "escolas de idiomas",
  "palavrasChave": "curso de inglês, escola de idiomas, aulas de inglês"
}

// Cursos Profissionalizantes
{
  "nicho": "cursos profissionalizantes",
  "palavrasChave": "curso profissionalizante, qualificação profissional, curso técnico"
}

// Aulas Particulares
{
  "nicho": "aulas particulares",
  "palavrasChave": "aula particular, reforço escolar, professor particular"
}
```

### Serviços Residenciais

```json
// Eletricistas
{
  "nicho": "serviços de eletricista",
  "palavrasChave": "eletricista, instalação elétrica, reparo elétrico"
}

// Encanadores
{
  "nicho": "serviços de encanamento",
  "palavrasChave": "encanador, desentupidora, instalação hidráulica"
}

// Pintores
{
  "nicho": "serviços de pintura",
  "palavrasChave": "pintor, pintura residencial, pintura predial"
}
```

---

## 📋 Template para Configurar Qualquer Nicho

Use este template e preencha com seus dados:

```json
{
  "cidade": "[NOME DA SUA CIDADE]",
  "estado": "[UF]",
  "nicho": "[DESCRIÇÃO DO NICHO]",
  "palavrasChave": "[palavra1, palavra2, palavra3, palavra4]",
  "maxResultados": 20
}
```

### Dicas para palavrasChave:

1. **Use sinônimos**: "restaurante, lanchonete, comida"
2. **Use variações**: "salão de beleza, salão, cabeleireiro"
3. **Separe por vírgula**: Sempre separar as palavras com vírgula
4. **4-6 palavras**: Não use muitas, 4 a 6 é o ideal
5. **Sem acentos funciona**: Mas com acentos é melhor

---

## 🔧 Configuração Avançada

### Buscar em Múltiplas Cidades

Para buscar em várias cidades ao mesmo tempo, você pode:

**Opção 1: Criar múltiplas execuções**
```json
// Primeira execução
{ "cidade": "São Paulo", "estado": "SP", ... }

// Segunda execução (editar e executar novamente)
{ "cidade": "Rio de Janeiro", "estado": "RJ", ... }
```

**Opção 2: Clonar o workflow**
1. Duplique o workflow inteiro
2. Configure cada um com uma cidade diferente
3. Execute todos em paralelo

### Buscar Múltiplos Nichos

**Opção 1: Ampliar as palavras-chave**
```json
{
  "nicho": "serviços de beleza",
  "palavrasChave": "salão, barbearia, estética, manicure, cabeleireiro, spa"
}
```

**Opção 2: Executar múltiplas vezes**
```json
// Primeira busca: Salões
{ "palavrasChave": "salão de beleza, cabeleireiro" }

// Segunda busca: Barbearias
{ "palavrasChave": "barbearia, barbeiro" }
```

### Limitar por Bairro

Para buscar em bairros específicos:

```json
{
  "cidade": "São Paulo",
  "estado": "SP",
  "nicho": "restaurantes no Jardins",
  "palavrasChave": "restaurante Jardins, lanchonete Jardins"
}
```

Ou:

```json
{
  "palavrasChave": "restaurante próximo Avenida Paulista"
}
```

---

## ✅ Checklist de Configuração

Antes de executar, verifique:

- [ ] Cidade está correta
- [ ] Estado está correto (sigla: SP, RJ, MG...)
- [ ] Palavras-chave fazem sentido para o nicho
- [ ] maxResultados está entre 10-50 (para teste: 3-5)
- [ ] Salvou as alterações no nó

---

## 🎯 Exemplo Prático Passo a Passo

### Cenário: Você quer buscar clínicas odontológicas em Campinas/SP

**Passo 1**: Abra o workflow no N8N

**Passo 2**: Clique no nó "Configurações de Busca"

**Passo 3**: Cole esta configuração:

```json
{
  "cidade": "Campinas",
  "estado": "SP",
  "nicho": "clínicas odontológicas",
  "palavrasChave": "clínica odontológica, dentista, ortodontia, implante dentário",
  "maxResultados": 5
}
```

**Passo 4**: Salve

**Passo 5**: Execute o workflow (botão "Execute Workflow")

**Passo 6**: Veja os resultados:
- No próprio N8N (cada nó mostra quantos registros processou)
- No Supabase (tabela `leads`)

**Passo 7**: Se funcionou, aumente `maxResultados` para 20-50 e execute novamente

---

## 🚨 Troubleshooting

### "Nenhum resultado encontrado"

**Solução**: Ajuste as palavras-chave

❌ Muito específico:
```json
"palavrasChave": "clínica odontológica especializada em implantes"
```

✅ Melhor:
```json
"palavrasChave": "dentista, clínica odontológica, ortodontia"
```

### "Muitos resultados, mas sem telefone"

**Solução**: Isso é normal. O workflow filtra automaticamente apenas leads com telefone. Se poucos têm telefone:

1. Aumente `maxResultados` para 50-100
2. Use SerpAPI (API paga mas com mais dados)
3. Tente palavras-chave diferentes

### "Resultados de outras cidades"

**Solução**: Seja mais específico

✅ Correto:
```json
{
  "cidade": "Santos",
  "palavrasChave": "restaurante em Santos"
}
```

---

## 💡 Dicas de Ouro

1. **Comece pequeno**: Use `maxResultados: 5` para testar
2. **Teste as palavras**: Pesquise no Google Maps primeiro para ver se retorna resultados
3. **Use aspas**: Para expressões exatas: `"salão de beleza"`
4. **Combine termos**: "restaurante vegetariano", "clínica popular"
5. **Bairros nobres**: Geralmente têm mais empresas com site e contato

---

## 📞 Precisa de Ajuda?

Se ainda tiver dúvidas:
1. Consulte `exemplos-configuracao.md` para mais exemplos
2. Teste com as configurações de exemplo primeiro
3. Me pergunte! 😊

---

**Pronto! Agora você sabe exatamente como configurar cidade e nicho!** 🎉
