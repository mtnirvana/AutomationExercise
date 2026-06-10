# Self-Heal Workflow

Este workflow é ativado quando o usuário pede para resolver uma Issue de self-healing.

## Fluxo

1. **IDENTIFICAR** → Ler a Issue do GitHub (testId, erro, step)
2. **DIAGNOSTICAR** → Step 0: site acessível? erro é de seletor?
3. **INVESTIGAR** → Playwright CLI: open → goto → snapshot → generate-locator
4. **CORRIGIR** → Page Object + `Seletores.md` + `Especificacao_Tecnica_Web.md`
5. **BACKUP** → Salvar cópias em `automationexercise/Backup/`
6. **GIT** → Branch `fix/self-heal-{testId}` + Commit + Push + PR
7. **EVIDÊNCIA** → Gerar GIF com `node scripts/gerar_gifs.js`
8. **COMUNICAR** → Comentar na Issue o resultado

## Regras

- NUNCA fazer self-heal se o site estiver fora do ar
- NUNCA fazer self-heal se o erro não for de seletor
- NUNCA exceder 3 tentativas
- SEMPRE fazer backup antes de modificar documentação
