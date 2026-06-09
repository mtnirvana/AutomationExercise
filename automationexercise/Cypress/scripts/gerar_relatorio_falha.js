/**
 * gerar_relatorio_falha.js
 *
 * O QUE FAZ: Lê os arquivos do allure-results (gerados pelo Cypress),
 *            identifica quais testes falharam, e gera relatórios JSON.
 *
 * ONDE RODA: Na nuvem do GitHub Actions (Ubuntu)
 *
 * COMO FUNCIONA:
 *   1. O Cypress, quando roda, gera arquivos JSON em:
 *      cypress/allure/allure-results/
 *   2. Esse script lê esses arquivos
 *   3. Para cada teste com status "failed" ou "broken":
 *      - Extrai testId, mensagem de erro, step que falhou
 *      - Classifica o erro (é seletor? é site down?)
 *      - Gera um JSON em cypress/reports/failure/
 *   4. O job "create-issue" no CI usa esses JSONs para criar a Issue
 *
 * Uso local: node scripts/gerar_relatorio_falha.js
 */
const fs = require('fs');
const path = require('path');

const ALLURE_RESULTS_DIR = path.join(__dirname, '..', 'cypress', 'allure', 'allure-results');
const FAILURE_REPORT_DIR = path.join(__dirname, '..', 'cypress', 'reports', 'failure');

function extractTestId(name) {
  if (!name) return 'UNKNOWN';
  const match = name.match(/TC_(WEB|API|PF)_(MOCK|\d{3})/);
  return match ? match[0] : 'UNKNOWN';
}

function extractErrorMessage(data) {
  if (data.statusDetails?.message) return data.statusDetails.message;
  if (data.statusDetails?.trace) return data.statusDetails.trace.split('\n')[0];
  return 'Unknown error';
}

function extractFailedStep(data) {
  if (data.steps && Array.isArray(data.steps)) {
    const failedStep = data.steps.find(s => s.status === 'failed' || s.status === 'broken');
    return failedStep ? failedStep.name : 'N/A';
  }
  return 'N/A';
}

function isSelectorError(error) {
  if (!error) return false;
  const patterns = ['Timed out retrying', 'detached from the DOM', 'no element was found'];
  return patterns.some(p => error.includes(p));
}

function gerarIssueBody(fail) {
  const ciRunUrl = process.env.GITHUB_SERVER_URL
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : 'N/A';
  return `
## Teste Falhou no CI

**Test ID:** \`${fail.testId}\`
**Teste:** ${fail.testName}
**Status:** ${fail.status}
**CI Run:** ${ciRunUrl}

### Erro
\`\`\`
${fail.error}
\`\`\`

### Instrucoes
1. Abra o site e verifique se esta no ar
2. Use Playwright CLI para inspecionar a pagina
3. Atualize o Page Object e o Seletores.md
4. Crie um PR com a correcao
`;
}

function main() {
  console.log('[FAILURE REPORT] Iniciando...');

  if (!fs.existsSync(ALLURE_RESULTS_DIR)) {
    console.log('[FAILURE REPORT] Pasta allure-results nao encontrada.');
    console.log('[FAILURE REPORT] Nenhum relatorio gerado.');
    return;
  }

  if (!fs.existsSync(FAILURE_REPORT_DIR)) {
    fs.mkdirSync(FAILURE_REPORT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(ALLURE_RESULTS_DIR).filter(f => f.endsWith('.json'));
  console.log(`[FAILURE REPORT] ${files.length} arquivos encontrados.`);

  const failures = [];
  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(ALLURE_RESULTS_DIR, file), 'utf8'));
      if (data.status === 'failed' || data.status === 'broken') {
        const failure = {
          testId: extractTestId(data.name || data.fullName),
          testName: data.name || 'Unknown',
          status: data.status,
          error: extractErrorMessage(data),
          step: extractFailedStep(data),
          isSelectorError: isSelectorError(extractErrorMessage(data)),
          timestamp: new Date().toISOString(),
        };
        failure.issueBody = gerarIssueBody(failure);
        failures.push(failure);
      }
    } catch (err) {
      console.error(`  Erro ao ler ${file}: ${err.message}`);
    }
  }

  console.log(`[FAILURE REPORT] ${failures.length} falha(s) encontrada(s).`);

  for (const fail of failures) {
    const reportPath = path.join(FAILURE_REPORT_DIR, `${fail.testId}_failure.json`);
    fs.writeFileSync(reportPath, JSON.stringify(fail, null, 2));
    console.log(`[FAILURE REPORT] Relatorio salvo: ${reportPath}`);
  }

  const summary = {
    totalFailures: failures.length,
    timestamp: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(FAILURE_REPORT_DIR, '_summary.json'), JSON.stringify(summary, null, 2));
  console.log('[FAILURE REPORT] Concluido.');
}

main();
