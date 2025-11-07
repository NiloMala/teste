# 🖼️ Guia Visual - Passo a Passo com Imagens

## 📍 Onde Configurar no N8N

### Passo 1: Localizar o Nó
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [Trigger Manual] → [Configurações de Busca] →     │
│                           ☝️                        │
│                      CLIQUE AQUI                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Passo 2: Abrir o Painel de Edição

Quando você clicar no nó "Configurações de Busca", vai abrir um painel lateral assim:

```
┌──────────────────────────────────────┐
│  Configurações de Busca              │
│  ────────────────────────            │
│                                      │
│  Parameters                          │
│                                      │
│  └─ Values to Set                    │
│      └─ Values                       │
│          ├─ cidade                   │
│          │   └─ "São Paulo"          │ ← Edite aqui
│          ├─ estado                   │
│          │   └─ "SP"                 │ ← Edite aqui
│          ├─ nicho                    │
│          │   └─ "restaurantes..."    │ ← Edite aqui
│          ├─ palavrasChave            │
│          │   └─ "restaurante,..."    │ ← Edite aqui
│          └─ maxResultados            │
│              └─ 20                   │ ← Edite aqui
│                                      │
│  [Execute Node]  [Save]              │
└──────────────────────────────────────┘
```

### Passo 3: Editar os Campos

Clique em cada campo para editar:

#### Campo: cidade
```
┌─────────────────────────┐
│ String                  │
│ ───────────────────     │
│ Name: cidade            │
│ Value: [São Paulo    ]  │ ← Clique e edite
│                         │
└─────────────────────────┘
```

#### Campo: estado
```
┌─────────────────────────┐
│ String                  │
│ ───────────────────     │
│ Name: estado            │
│ Value: [SP           ]  │ ← Clique e edite
│                         │
└─────────────────────────┘
```

#### Campo: palavrasChave
```
┌──────────────────────────────────────┐
│ String                               │
│ ────────────────────────             │
│ Name: palavrasChave                  │
│ Value: [restaurante, lanchonete  ]   │ ← Clique e edite
│                                      │
└──────────────────────────────────────┘
```

---

## 🎯 Exemplos Rápidos - Copie e Cole

### 1. Salões em Curitiba

**Copie isso:**
```
Cidade: Curitiba
Estado: PR
Nicho: salões de beleza
Palavras-chave: salão de beleza, cabeleireiro, manicure
```

**Cole assim no N8N:**
- Campo `cidade` → `Curitiba`
- Campo `estado` → `PR`
- Campo `nicho` → `salões de beleza`
- Campo `palavrasChave` → `salão de beleza, cabeleireiro, manicure`

### 2. Clínicas em Belo Horizonte

**Copie isso:**
```
Cidade: Belo Horizonte
Estado: MG
Nicho: clínicas odontológicas
Palavras-chave: dentista, clínica odontológica, ortodontia
```

### 3. Restaurantes em Florianópolis

**Copie isso:**
```
Cidade: Florianópolis
Estado: SC
Nicho: restaurantes
Palavras-chave: restaurante, lanchonete, pizzaria
```

### 4. Academias em Brasília

**Copie isso:**
```
Cidade: Brasília
Estado: DF
Nicho: academias
Palavras-chave: academia, crossfit, pilates
```

### 5. Pet Shops em Porto Alegre

**Copie isso:**
```
Cidade: Porto Alegre
Estado: RS
Nicho: pet shops
Palavras-chave: pet shop, veterinária, banho e tosa
```

---

## 🖱️ Interface do N8N - O que Você Vai Ver

### Visão Geral do Workflow

```
┌───────────────────────────────────────────────────────────────┐
│  Workflow: Geração de Leads - Empresas Locais                │
│  ─────────────────────────────────────────────────────────    │
│                                                               │
│   ┌──────────────┐                                          │
│   │   Trigger    │                                          │
│   │   Manual     │                                          │
│   └──────┬───────┘                                          │
│          │                                                   │
│          ↓                                                   │
│   ┌──────────────────┐                                      │
│   │ Configurações de │  ← EDITE AQUI                        │
│   │     Busca        │                                      │
│   └──────┬───────────┘                                      │
│          │                                                   │
│          ↓                                                   │
│   ┌──────────────┐         ┌──────────────┐               │
│   │   Buscar no  │         │    Busca     │               │
│   │ Google Maps  │         │ Alternativa  │               │
│   └──────┬───────┘         └──────┬───────┘               │
│          │                        │                        │
│          └────────┬───────────────┘                        │
│                   ↓                                        │
│            ┌─────────────┐                                │
│            │  Combinar   │                                │
│            │ Resultados  │                                │
│            └──────┬──────┘                                │
│                   │                                        │
│                  ...                                       │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Como Executar

```
┌─────────────────────────────────────┐
│  Toolbar do N8N                     │
│  ─────────────────                  │
│                                     │
│  [←] [→] [⚙️] [▶️ Execute] [💾 Save] │
│               ↑                     │
│         CLIQUE AQUI                 │
│         para executar               │
│                                     │
└─────────────────────────────────────┘
```

---

## 📊 Verificando os Resultados

### No N8N

Após executar, cada nó mostrará:

```
┌──────────────────────┐
│ Configurações de     │
│ Busca               │
│                      │
│ ✅ 1 item           │  ← Sucesso
└──────────────────────┘

┌──────────────────────┐
│ Buscar no           │
│ Google Maps          │
│                      │
│ ✅ 1 item           │  ← Sucesso
└──────────────────────┘

┌──────────────────────┐
│ Processar e         │
│ Extrair Dados        │
│                      │
│ ✅ 15 items         │  ← 15 empresas encontradas
└──────────────────────┘

┌──────────────────────┐
│ Filtrar com         │
│ Telefone             │
│                      │
│ ✅ 8 items          │  ← 8 empresas com telefone
└──────────────────────┘
```

### No Supabase

```
┌─────────────────────────────────────────────────────────┐
│  Supabase - Table Editor                                │
│  ──────────────────────                                 │
│                                                         │
│  📊 leads                                               │
│                                                         │
│  nome_empresa     | telefone      | cidade | status    │
│  ───────────────────────────────────────────────────── │
│  Pizza do João    | 11999887766   | SP     | novo      │
│  Salão da Maria   | 11988776655   | SP     | novo      │
│  Academia Fit     | 11977665544   | SP     | novo      │
│  ...                                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ⚙️ Configurações Extras

### Quantos Leads Buscar?

No campo `maxResultados`:

```
Para teste:         5-10 leads
Para produção:     20-50 leads
Para grande volume: 50-100 leads
```

**Recomendação**: Sempre comece com 5 para testar!

### Palavras-Chave: O Segredo

#### ❌ Errado
```
palavrasChave: "melhores restaurantes com comida italiana"
```
Muito longo, muito específico.

#### ✅ Correto
```
palavrasChave: "restaurante, italiano, pizza, massa"
```
Curto, direto, múltiplas palavras.

#### 🎯 Perfeito
```
palavrasChave: "restaurante italiano, pizzaria, cantina"
```
Expressões + palavras individuais.

---

## 🎨 Tabela de Referência Rápida

| Nicho | Palavras-Chave Sugeridas |
|-------|-------------------------|
| Restaurantes | `restaurante, lanchonete, pizzaria, cafeteria` |
| Salões | `salão de beleza, cabeleireiro, manicure, barbearia` |
| Clínicas | `dentista, clínica odontológica, consultório médico` |
| Academias | `academia, crossfit, pilates, yoga` |
| Pet Shops | `pet shop, veterinária, banho e tosa` |
| Lojas | `loja de roupas, boutique, calçados` |
| Oficinas | `oficina mecânica, auto center, funilaria` |

---

## 🔢 Estados do Brasil - Referência

| Estado | Sigla | Estado | Sigla |
|--------|-------|--------|-------|
| Acre | AC | Paraíba | PB |
| Alagoas | AL | Paraná | PR |
| Amapá | AP | Pernambuco | PE |
| Amazonas | AM | Piauí | PI |
| Bahia | BA | Rio de Janeiro | RJ |
| Ceará | CE | Rio Grande do Norte | RN |
| Distrito Federal | DF | Rio Grande do Sul | RS |
| Espírito Santo | ES | Rondônia | RO |
| Goiás | GO | Roraima | RR |
| Maranhão | MA | Santa Catarina | SC |
| Mato Grosso | MT | São Paulo | SP |
| Mato Grosso do Sul | MS | Sergipe | SE |
| Minas Gerais | MG | Tocantins | TO |

---

## ✅ Checklist Final

Antes de executar, confirme:

- [ ] Abriu o workflow no N8N
- [ ] Clicou no nó "Configurações de Busca"
- [ ] Editou o campo `cidade`
- [ ] Editou o campo `estado`
- [ ] Editou o campo `palavrasChave`
- [ ] Configurou `maxResultados` para 5 (teste)
- [ ] Clicou em **Save**
- [ ] Clicou em **Execute Workflow**
- [ ] Aguardou a execução
- [ ] Verificou os resultados

---

## 🎬 Fluxo Completo em Texto

1. Abra N8N
2. Abra o workflow "Geração de Leads"
3. Clique no nó "Configurações de Busca" (segundo nó)
4. Veja o painel lateral abrir à direita
5. Role até "Values to Set" → "Values"
6. Clique em cada campo e edite:
   - `cidade`: Sua cidade
   - `estado`: Sigla do estado
   - `nicho`: Descrição do nicho
   - `palavrasChave`: Palavras separadas por vírgula
   - `maxResultados`: 5 para teste
7. Clique em "Save" (canto superior direito)
8. Clique em "Execute Workflow" (botão play)
9. Aguarde (10-30 segundos)
10. Veja os nós ficarem verdes ✅
11. Vá no Supabase → Table Editor → leads
12. Veja os leads capturados!

---

## 🆘 Ajuda Rápida

### Não encontro o nó "Configurações de Busca"
→ É o segundo nó, logo após "Trigger Manual"

### Não aparece o painel lateral
→ Clique diretamente no retângulo do nó

### Não consigo editar
→ Clique no valor (texto) que quer editar

### Não salvou as alterações
→ Clique no botão "Save" no canto superior direito

### Executei mas deu erro
→ Veja qual nó ficou vermelho ❌ e leia a mensagem de erro

---

**Pronto! Agora é só seguir o passo a passo visual!** 🎉

Qualquer dúvida, me chame! 😊
