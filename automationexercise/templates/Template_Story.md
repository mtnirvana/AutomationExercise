# Template de Dissecação de Story - Automation Exercise
**Versão:** 1.0.0<br>
**Propósito:** Interpretador universal de stories — extrai significado, fluxo, dados, regras de negócio, premissas ocultas, ambiguidades e validação crítica.<br>
**Responsável:** Rafael Barelli

---

## Instruções de Uso (LEIA ANTES)

Este template é um **guia interpretativo**, não um formulário fixo. A IA deve:

1. **Ler o template completamente** antes de tocar na story.
2. **Ler a story** fornecida.
3. **Aplicar cada seção ativamente** — preenchendo com base na story, não com placeholders genéricos.
4. **Tomar decisões** onde a story for ambígua (e documentá-las na Seção 7).
5. **Produzir a Seção 8 (Saída para Pipeline)** como o único handoff para a próxima etapa.

Regras de ouro:
- **NÃO gerar código** nesta etapa.
- **NÃO planejar pipeline** (arquivos, docs, execução).
- **NÃO inventar requisitos** que a story não menciona.
- **NÃO tratar Critérios de Aceitação como casos de teste** — eles são validações dentro do fluxo.
- **Se uma seção não se aplica**, justifique por que, não ignore.

---

## Sumário

| Seção | O que faz |
|:-----:|-----------|
| **1.** Extração Estrutural | Parseia a story em campos estruturados |
| **2.** Classificação + Granularidade | Identifica tipo e decide 1 vs N testes |
| **3.** Análise de Fluxo | Mapeia passos, estados, checkpoints |
| **4.** Análise de Dados | Entidades, quantidades, diferenciação, ordem |
| **5.** Engenharia de Asserção | **VALIDAÇÃO TRIADE:** regra → assert → prova |
| **6.** Premissas Ocultas | Suposições não-escritas da story |
| **7.** Ambiguidades | Perguntas em aberto + decisões |
| **8.** Saída para Pipeline | Handoff estruturado para a próxima etapa |

---

## 1. Extração Estrutural

Extraia da story TODOS os campos abaixo. Se um campo não existir, marque como `[NÃO INFORMADO]`.

| Campo | Extraído |
|-------|----------|
| **Título** | |
| **Descrição completa** | |
| **Critérios de Aceitação** (lista, sem resumir) | |
| **Informações Adicionais** | |
| **Verbos de ação** (clicar, preencher, enviar, etc.) | |
| **Entidades mencionadas** (usuário, produto, pedido, fatura, etc.) | |
| **Atores/Personas** (cliente, admin, usuário logado, etc.) | |
| **Estados do sistema** (logado, não logado, carrinho vazio, etc.) | |

> **Regra:** Não interprete — EXTRAIA. A fidelidade da extração determina a qualidade de todas as seções seguintes.

---

## 2. Classificação + Granularidade

### 2.1 Classificação da Story

Analise o texto da story e classifique em UM ou MAIS tipos abaixo. Use as palavras-chave como guia, não como regra absoluta.

| Tipo | Palavras-chave comuns (indicadores, não regras) |
|------|--------------------------------------------------|
| **E2E Web** | clicar, navegar, botão, página, url, formulário, scroll, viewport, logar, checkout, carrinho |
| **API** | endpoint, API, status code, request, response, payload, header, método HTTP (GET/POST/PUT/DELETE) |
| **Performance** | VU, virtual user, threshold, latência, segundos, carga, estresse, pico, concorrente, duração, RPS |
| **Bug Fix** | não funciona, quebrado, erro, falha, inconsistente, bug, regression, parou de funcionar |
| **Segurança** | auth, token, sessão, permissão, XSS, SQL injection, criptografia, dado sensível, vazamento |
| **UI/UX** | layout, responsivo, mobile, visível, escondido, cor, fonte, alinhamento, espaçamento, acessibilidade |
| **Dados/Validação** | formato, schema, campo obrigatório, regex, máscara, tipo, validação, limite, caractere |
| **Performance Front-end** | LCP, CLS, INP, FCP, TTFB, Core Web Vitals, Lighthouse, Performance, auditoria |
| **Integração** | webhook, integração, outro sistema, evento, mensageria, callback, fila, terceiro |
| **Genérico** | Nenhum dos indicadores acima se aplica |

**Resultado da classificação:**
- Tipo(s) identificado(s): `[tipo1, tipo2, ...]`
- Justificativa: `[palavras ou frases da story que levaram a esta classificação]`
- Se múltiplos tipos: qual o PREDOMINANTE? `[tipo]`

### 2.2 Análise de Granularidade

Determine se a story gera UM teste ou MÚLTIPLOS testes independentes.

**Indicadores de FLUXO ÚNICO (1 teste):**
- Ações em sequência temporal (A → B → C), onde B depende de A
- Setup único compartilhado entre todos os passos (ex: criar 1 usuário e usar no fluxo todo)
- UM resultado final que depende de todos os passos anteriores
- Linguagem contínua: "o cliente faz X, depois Y, depois Z"

**Indicadores de MÚLTIPLOS FLUXOS (N testes):**
- Delimitação explícita: "Cenário 1:", "Cenário 2:", "Caso 1:", "Caso 2:"
- Alternativas mutuamente exclusivas (ex: "login válido" vs "login inválido")
- Setups independentes (cada cenário cria seus próprios dados)
- Sem dependência entre cenários (um pode falhar sem afetar o outro)

**Regra fundamental:**
Critérios de Aceitação NÃO são casos de teste. Eles são VALIDAÇÕES dentro do fluxo. Uma story com 3 ACs pode gerar 1 teste que valida os 3 ACs em sequência. Só quebre em múltiplos testes se houver independência real entre os fluxos.

**Resultado da granularidade:**
- Nº de testes: `[1 | N]`
- Se N > 1: listar cada fluxo com seus limites
- Justificativa: `[por que esta decisão]`

---

## 3. Análise de Fluxo

Mapeie o fluxo completo da story de acordo com o tipo classificado na Seção 2.

### Para E2E Web:

| Passo | Ação (da story) | Estado esperado do sistema | É checkpoint? | Checkpoint nº |
|:-----:|-----------------|---------------------------|:-------------:|:-------------:|
| 1 | | | | |
| 2 | | | | |
| ... | | | | |

- **Checkpoint** = ponto onde uma REGRA DE NEGÓCIO é validada. Passos intermediários (navegação, cliques sem validação de regra, preenchimento de formulário) NÃO são checkpoints.
- Regra: se o passo não valida diretamente um Critério de Aceitação ou uma regra de negócio explícita, ele NÃO é checkpoint.
- **Estado esperado** = o que deve ser verdade após a ação (ex: "carrinho com 2 itens", "página de login visível")

### Para API:

| Passo | Requisição | Payload/Params | Status esperado | É checkpoint? |
|:-----:|------------|----------------|:---------------:|:-------------:|
| 1 | | | | |
| 2 | | | | |

### Para Performance:

| Fase | Duração | VUs | Métrica-alvo | Checkpoint? |
|:----:|:-------:|:---:|:------------:|:-----------:|
| ramp-up | | | | |
| steady | | | | |
| ramp-down | | | | |

### Para Bug Fix:

| Passo | Ação | Resultado atual (bug) | Resultado esperado |
|:-----:|------|:---------------------:|:------------------:|
| 1 | | | |
| 2 | | | |

### Para Segurança:

| Passo | Vetor | Alvo | Ataque | Defesa esperada |
|:-----:|-------|:----:|--------|:---------------:|
| 1 | | | | |

### Para UI/UX:

| Elemento | Condição | Estado atual | Estado esperado |
|----------|----------|:------------:|:---------------:|
| | | | |

### Para Dados:

| Campo | Regra | Input válido | Input inválido | Resposta esperada |
|-------|-------|:------------:|:--------------:|:-----------------:|
| | | | | |

### Para Genérico ou Misto:

Use a estrutura que melhor representa o fluxo descrito. Se for misto, mapeie os pontos de integração entre os tipos.

---

## 4. Análise de Dados

### 4.1 Entidades e Propriedades

Liste TODAS as entidades mencionadas na story e suas propriedades.

| Entidade | Propriedade | Quantidade | Origem | Depende de |
|----------|-------------|:----------:|:------:|:-----------:|
| | | | | |
| | | | | |

**Origem:** `[estática | dinâmica (factory) | gerada pelo sistema | fornecida pelo usuário]`

### 4.2 Análise de Diferenciação

Para cada entidade com quantidade > 1 ou com valores comparáveis, responda:

**Pergunta 1 — Identidade vs Existência:**
> "Verificar apenas que a entidade EXISTE é suficiente para provar que a regra de negócio foi validada?"

Se a resposta for NÃO (porque a entidade pode existir mas ser a ERRADA), então o assert precisa **parear identidade + valor**. Exemplo: não basta verificar "2 itens no carrinho" — precisa verificar "Produto A na posição 0 E Produto B na posição 1".

**Pergunta 2 — Quantidades individuais vs totais:**
> "Se duas quantidades forem IGUAIS, ainda consigo provar que a individualidade foi preservada?"

Se a resposta for NÃO, as quantidades PRECISAM ser diferentes no teste. Exemplo: se o teste tem Produto A com qty 2 e Produto B com qty 2, um swap (B na posição A, A na posição B) não seria detectado.

**Pergunta 3 — Ordem importa?**
> "A ordem dos elementos (posição na lista, linha na tabela, sequência de ítems) precisa ser preservada para a regra ser válida?"

Se SIM:
- Qual ordem exata deve ser mantida?
- O que caracteriza uma violação de ordem?

Se NÃO:
- Por que a ordem não afeta a regra de negócio?

Se a story NÃO especificar, DECIDA (e documente em Ambiguidades).

**Pergunta 4 — Conteúdo vs Existência de arquivo:**
> "Se o teste verifica um arquivo gerado, verificar apenas que o arquivo EXISTE prova que o conteúdo está correto?"

Se NÃO (porque o arquivo pode existir mas estar VAZIO ou com dados ERRADOS), então o assert precisa verificar CONTEÚDO.

**Resultado da análise de diferenciação:**

| Entidade | Precisa diferenciar? | Como? | Ordem importa? |
|----------|:--------------------:|-------|:--------------:|
| | | | |

---

## 5. Engenharia de Asserção (SEÇÃO CRÍTICA)

### Framework: Validação Triade

Para cada CHECKPOINT identificado na Seção 3 (Análise de Fluxo):

```
┌──────────────────────────────────────────────────────────────┐
│ CHECKPOINT [N]: [descrição do checkpoint]                     │
├──────────────────────────────────────────────────────────────┤
│ REGRA DE NEGÓCIO:                                            │
│   O que o sistema DEVE garantir. Linguagem do cliente/PO.    │
│   "O carrinho mantém os mesmos itens com as mesmas           │
│    quantidades após o relogin"                               │
├──────────────────────────────────────────────────────────────┤
│ ASSERÇÃO TÉCNICA:                                            │
│   O que o teste CONCRETAMENTE verifica. Deve ser             │
│   específico, mensurável, reproduzível.                      │
│   → .cart_description na linha 1 contém "Produto A"          │
│   → .cart_quantity na linha 1 contém "2"                     │
│   → .cart_description na linha 2 contém "Produto B"          │
│   → .cart_quantity na linha 2 contém "5"                     │
├──────────────────────────────────────────────────────────────┤
│ FALSO POSITIVO POTENCIAL:                                    │
│   Cenário onde este assert PASSARIA mas a regra de negócio   │
│   estaria VIOLADA.                                            │
│   Ex: "Se eu verificar só o NÚMERO de itens, posso ter       │
│        produtos trocados mas com mesma contagem. Assert       │
│        passa, regra violada."                                 │
│   Risco: [ALTO | MÉDIO | BAIXO]                              │
├──────────────────────────────────────────────────────────────┤
│ MITIGAÇÃO:                                                   │
│   Como o assert é ajustado para GARANTIR a validação.        │
│   Ex: "Parear nome do produto + quantidade como par único    │
│        em cada posição. Verificar ambas as propriedades       │
│        juntas, não isoladamente."                             │
├──────────────────────────────────────────────────────────────┤
│ PROVA DE VALIDADE:                                           │
│   Demonstração lógica: "Se este assert passar, a regra de    │
│   negócio FOI validada?"                                      │
│                                                                │
│   Contraprova: "Consigo imaginar UM ÚNICO cenário onde        │
│   o assert passa e a regra está violada?"                     │
│   → SIM → refinar o assert (voltar para Mitigação)            │
│   → NÃO → assert VÁLIDO                                       │
├──────────────────────────────────────────────────────────────┤
│ PESO: [OBRIGATÓRIO | CRÍTICO | IMPORTANTE | DESEJÁVEL]      │
│   OBRIGATÓRIO = sem este assert o teste não testa NADA       │
│   CRÍTICO = sem este assert a regra de negócio PRINCIPAL     │
│             não é validada                                    │
│   IMPORTANTE = valida fluxo secundário ou conforto           │
│   DESEJÁVEL = valida consistência ou redundância             │
├──────────────────────────────────────────────────────────────┤
│ DEPENDE DE: [checkpoint antecedente]                          │
│   Se este checkpoint depende de outro para fazer sentido.    │
│   Se o checkpoint anterior falhar, este é irrelevante.       │
└──────────────────────────────────────────────────────────────┘
```

### Regras de Ouro para Asserção

1. **"Um assert que INDEPENDE da semântica do negócio é um falso positivo esperando para acontecer."**
   - Verifique SEMPRE: este assert verifica a IDENTIDADE do dado ou apenas a EXISTÊNCIA?

2. **"Se o sistema retornar dados trocados/errados mas no formato esperado, este assert CAPTURA?"**
   - Se NÃO, o assert é INSUFICIENTE.

3. **"A prova de validade é OPCIONAL mas REVELADORA."**
   - Se você não consegue provar que o assert valida a regra, o assert é FRACO.

4. **"Quanto mais específico o assert, menor a chance de falso positivo."**
   - Prefira `contém texto exato` sobre `existe`, prefira `posição + valor` sobre `quantidade total`.

5. **"Verificar só que o arquivo EXISTE é um falso positivo."**
   - O arquivo pode existir mas estar VAZIO ou com dados incorretos.
   - Use SEMPRE `cy.readFile()` + verificação de conteúdo (`.should('include', valorEsperado)`).

### Asserções Proibidas (NÃO usar como assert único)

Aqui estão padrões de assert que a história deste projeto já mostrou serem FRACOS. Use esta lista como referência para identificar problemas similares no seu checkpoint:

| Padrão frágil | Por que é frágil | Alternativa robusta |
|---------------|------------------|---------------------|
| Verificar só CONTAGEM de itens (ex: "2 itens") | Não prova que são os itens CERTOS | Verificar IDENTIDADE + VALOR de cada item |
| Verificar só QUANTIDADE TOTAL (ex: "total = 7") | Não prova individualidade, pode estar trocado | Verificar quantidade INDIVIDUAL de cada item |
| Verificar só que CAMPO FOI PREENCHIDO | Não prova que o valor FOI SUBMETIDO | Verificar o valor APÓS o submit |
| Verificar só que ARQUIVO EXISTE | Arquivo pode estar VAZIO ou com dados incorretos | Verificar CONTEÚDO do arquivo |
| Verificar só que BOTÃO/LINK está VISÍVEL | Não prova que a AÇÃO ACONTECEU | Verificar o RESULTADO da ação (ex: arquivo baixado, página mudou) |
| Verificar só STATUS CODE 200 | Response body pode ter erro mesmo com 200 | Verificar STATUS + BODY juntos |
| Verificar só que MENSAGEM DE ERRO apareceu | Mensagem pode ser genérica, não específica | Verificar TEXTO EXATO da mensagem |
| Verificar que elemento ESTÁ VISÍVEL em viewport X | Pode estar visível mas NÃO CLICÁVEL | Verificar VISIBILIDADE + CLICABILIDADE |

> **ATENÇÃO:** Esta lista não é exaustiva. Para cada checkpoint, a IA DEVE criar sua própria análise de "assert frágil" específico para aquele caso.

---

## 6. Premissas Ocultas

Identifique o que a story NÃO diz mas PRESSUPÕE para fazer sentido. Use os padrões abaixo como guia, mas adapte ao tipo da story.

### Padrões por tipo de story

**Para E2E:**
- "Cada navegação pressupõe que a página carregou completamente"
- "Elementos estão visíveis e interagíveis antes da ação"
- "Dados persistem entre páginas e/ou sessões" — o DISSECT alerta, o CODE verifica na prática
- "Não há popups, alertas ou modais inesperados"
- "O navegador tem viewport suficiente para exibir os elementos"

**Para API:**
- "O endpoint está online e respondendo"
- "O payload está no formato esperado pelo servidor"
- "Autenticação não é necessária ou já está resolvida"
- "Rate limiting não será um fator"

**Para Performance:**
- "O ambiente de teste está isolado (sem interferência externa)"
- "As métricas são estáveis entre execuções"
- "Os thresholds são realistas para o ambiente atual"
- "O sistema suporta o número de VUs configurado sem crash"

**Para Bug:**
- "O bug é reproduzível (não é intermitente)"
- "O ambiente de teste é equivalente ao de produção"
- "O bug não é um comportamento esperado (working as intended)"
- "Não há dependência de dados específicos que só existem em produção"

**Para Segurança:**
- "O teste não causará danos reais ao sistema"
- "Os dados sensíveis usados no teste são fictícios"
- "O sistema está configurado com as proteções padrão"

**Para UI/UX:**
- "Os elementos existem no DOM (não são carregados dinamicamente depois)"
- "As propriedades CSS são estáveis entre versões"

**Genéricas (qualquer story):**
- "O sistema está disponível e respondendo dentro do time esperado"
- "Dados de teste criados durante a execução serão limpos ao final"
- "Não há dependências externas indisponíveis (CDNs, APIs de terceiros)"
- "O tempo de resposta é adequado para o tipo de validação"

### Formato de saída

| Premissa | Impacto se FALSA | O que o CODE precisa verificar |
|----------|:----------------:|:-------------------------------|
| | | |

---

## 7. Ambiguidades e Pontos Cegos

### 7.1 Perguntas em Aberto

Identifique tudo que a story DEIXA EM ABERTO.

| Pergunta | Impacto | Decisão tomada |
|----------|:-------:|:--------------:|
| *Ex: "O comentário aparece ONDE exatamente?"* | Se for no lugar errado, assert falha | "Aparece na página de confirmação após Order Placed" |
| | | |

### 7.2 Decisões Tomadas

Documente TODAS as decisões que você tomou para resolver ambiguidades. A IA de código NÃO deve precisar redecidir nada.

| Decisão | Alternativa rejeitada | Justificativa |
|---------|:---------------------:|:-------------:|
| | | |

### 7.3 Padrões de ambiguidade (use como checklist)

- Ação não especificada: `[clicar vs hover vs type vs select?]`
- Estado inicial não definido: `[logado vs não logado?]`
- Local exato: `[página X vs página Y? modal vs página cheia?]`
- Momento exato: `[antes do submit vs após submit?]`
- Formato do dado: `[qual tipo/formato?]`
- O que é sucesso vs falha: `[regra não está clara?]`
- Ator não especificado: `[quem executa a ação?]`
- Limite não especificado: `[quantos itens? quanto tempo?]`

---

## 8. Saída para Pipeline (HANDOFF)

Esta seção é o ÚNICO artefato que a pipeline (CODE) deve consumir. A IA de código NÃO precisa reler a story original.

```
╔══════════════════════════════════════════════════════════════╗
║                    HANDOFF PARA PIPELINE                      ║
╚══════════════════════════════════════════════════════════════╝

1. DECISÃO DE TESTE
   ┌─ Tipo: [E2E | API | PERFORMANCE | BUG | SEGURANÇA | UI/UX | DADOS | MISTO]
   ├─ Nº de testes: [1 | N]
   ├─ Justificativa: [por que esta granularidade]
   ├─ Nome sugerido (português): [título do teste]
   └─ Nome sugerido (arquivo): [se aplicável — ### DEVE ser o próximo número sequencial. Use glob para consultar o maior TC existente antes de definir.]

2. ESCOPO
   ┌─ Abrange:
   │  ├─ [passo 1] → [ação + estado esperado]
   │  ├─ [passo 2] → [ação + estado esperado]
   │  └─ ...
   └─ Não abrange:
      ├─ [cenário excluído]
      └─ [motivo]

3. DADOS
   ┌─ Entidade │ Propriedade │ Qtd │ Diferenciar? │ Origem │ Ordem?
   ├─ ─────────┼─────────────┼─────┼──────────────┼────────┼───────
   ├─ [ent]    │ [prop]      │ [N] │ [S/N + como]  │ [orig] │ [S/N]
   └─ ...
   ┌─ Decisões de diferenciação:
   │  ├─ [entidade]: [como garantir identidade]
   │  └─ [entidade]: [como garantir quantidade individual]
   └─ Decisões de ordem:
      └─ [se ordem importa: qual ordem; se não: por que]

4. ASSERÇÕES (condensado)
   ┌─ Checkpoint │ Regra │ Assert-chave │ Risco FP │ Peso
   ├─ ───────────┼───────┼──────────────┼──────────┼─────
   ├─ [CP1]      │ [regra]│ [assert]    │ [A/M/B]  │ [peso]
   └─ ...
   ┌─ Asserções OBRIGATÓRIAS (sem elas, teste é inválido):
   │  ├─ [checkpoint] → [assert mínimo que prova a regra]
   │  └─ [checkpoint] → [assert mínimo que prova a regra]
   ├─ Asserções CRÍTICAS (sem elas, regra principal não validada):
   │  └─ [checkpoint] → [assert crítico]
    └─ PROIBIDO usar como assert único:
       ├─ ❌ Verificar só que ARQUIVO EXISTE sem verificar CONTEÚDO (ex: `cy.readFile().should('exist')`)
       ├─ ❌ [assert frágil identificado]
       └─ ❌ [assert frágil identificado]

5. PREMISSAS A VALIDAR NO CÓDIGO
   ┌─ [premissa] — [o que acontece se for FALSA]
   └─ [premissa] — [o que acontece se for FALSA]

6. CONDIÇÕES DE INVALIDAÇÃO DO TESTE
   ┌─ [condição que tornaria todo o teste sem sentido]
   └─ [condição que tornaria todo o teste sem sentido]
   Se alguma condição acima for verdadeira, PARAR e reavaliar.

7. AMBIGUIDADES RESOLVIDAS
   ┌─ [ambiguidade] → [decisão]
   └─ [ambiguidade] → [decisão]
```

---

## ⚠️ REGRA FUNDAMENTAL — FALSO POSITIVO

> **"Um teste que passa validando nada é pior que um teste que falha."**

Se durante o RUN o sistema não implementar a regra de negócio:
- **NÃO** enfraqueça a asserção para fazer o teste passar
- **NÃO** remova o checkpoint do teste
- A falha é o **resultado correto** — o teste revelou um bug
- Documente o bug e prossiga com a pipeline

Esta regra vale para TODOS os tipos de assert:
- ❌ "Comentário não aparece no pedido? Vou remover essa asserção." → ERRADO
- ✅ "Comentário não aparece no pedido? O teste falha e reporta o bug." → CORRETO

---

## Instruções de Preenchimento (RELEMBRETE)

1. Cada seção deve ser preenchida ATIVAMENTE com base na story.
2. Se uma seção não se aplica ao tipo da story, EXPLIQUE POR QUE.
3. A Seção 5 (Engenharia de Asserção) é a MAIS IMPORTANTE. Dedique mais tempo a ela.
4. A Seção 8 (Saída para Pipeline) é o ÚNICO handoff. Ela deve ser auto-suficiente.
5. Ao final, releia a Seção 8 e pergunte: "Uma IA que só ler esta seção consegue executar o pipeline corretamente?"

---

## Revisão Final (TRIPLE CHECK — OBRIGATÓRIO)

Antes de finalizar a dissertação, execute este checklist de verificação:

### Passo 1: Releia a Seção 8 (Handoff) isoladamente
1. "Uma IA que só ler esta seção consegue criar o teste corretamente?"
2. "Falta alguma informação que a IA de código teria que ADIVINHAR?"
3. "Todos os asserts mencionados têm PROVA DE VALIDADE ou são só 'existe'?"
4. "O número sequencial (###) foi validado contra os testes existentes? Está correto?"

### Passo 2: Verifique cada checkpoint contra a Story
5. "Cada checkpoint valida DIRETAMENTE um Critério de Aceitação?"
6. "Algum checkpoint é só passo intermediário disfarçado?" (se sim, REMOVER)
7. "A quantidade de checkpoints é MENOR que o número de passos?" (deve ser)

### Passo 3: Caça a Falsos Positivos
7. "Para cada assert obrigatório: consigo imaginar UM cenário onde ele passa e a regra está violada?" (se sim, o assert é FRACO)
8. "Tem algum assert que verifica só EXISTÊNCIA quando deveria verificar IDENTIDADE?"
9. "Tem algum assert que verifica só QUANTIDADE TOTAL quando deveria verificar INDIVIDUAL?"

### Passo 4: Verifique dados e diferenciação
10. "Se duas quantidades precisam ser diferentes, isso está EXPLÍCITO no handoff?"
11. "Se a ordem importa, isso está EXPLÍCITO?"
12. "As fontes dos dados (fixtures, factory, arquivo) estão ESPECIFICADAS?"
13. "Se o teste envolve download de arquivo gerado (fatura, relatório, invoice), o assert verifica o CONTEÚDO ou apenas a EXISTÊNCIA?"

> **Se alguma resposta for NÃO: corrija antes de finalizar o handoff.**

---

**Documento gerado em:** 2026-06-12
