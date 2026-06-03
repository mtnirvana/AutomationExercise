# Repositório de Seletores - Automation Exercise
**Versão:** 1.0.0<br>
**Metodologia:** POM (Page Object Model)<br>
**Responsável:** Rafael Barelli

---

## Estrutura por Pagina

Cada pagina e dividida em duas secoes:
- **Seletores (Getters):** Referencias diretas a elementos DOM
- **Metodos:** Ações encapsuladas que utilizam os seletores

---

### [NomePagina]Page

#### Seletores (Getters)
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status |
|----------|---------------|---------------|---------------|--------|
| `[nomeGetter]` | `[seletor]` | `[alternativa]` | `[alternativa]` | OK |

#### Metodos
| Metodo | Descricao | Seletor Interno | Status |
|--------|-----------|-----------------|--------|
| `[nomeMetodo()]` | [descricao em portugues] | `[getterUtilizado]` | OK |

---

<!--
## Instruções para o Agente

1. Use o Playwright CLI (consultando `playwright-cli/SKILL.md`) para inspecionar a página ao vivo
2. Descubra seletores seguindo a hierarquia: data-qa > id > name > texto > classe
3. Preencha este template com os seletores encontrados
4. Copie o bloco completo para o `Seletores.md` oficial
5. Crie/atualize o getter no Page Object correspondente
6. Remova ou adicione secoes de pagina conforme necessario, seguindo sempre o formato acima
-->

**Documento gerado em:** AAAA-MM-DD
