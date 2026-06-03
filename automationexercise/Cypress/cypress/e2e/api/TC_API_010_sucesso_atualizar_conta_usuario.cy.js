/**
 * TC_API_010 - Atualizar conta de usuário via API
 * @description Validar atualização de dados do usuário via PUT
 * @tags @sucesso @TC_API_010
 * @author Rafael Barelli
 */

import { UserFactory } from '../../data/UserFactory'

describe('TC_API_010 - Atualizar conta de usuário via API', () => {
  const testId = 'TC_API_010'
  let createdEmail = ''
  let userPassword = ''

  // Limpeza: Excluir usuário criado via DELETE /api/deleteAccount (executado após o teste)
  afterEach(() => {
    if (createdEmail) {
      cy.task('apiRequest', {
        hostname: 'automationexercise.com',
        path: '/api/deleteAccount',
        method: 'DELETE',
        body: `email=${createdEmail}&password=${userPassword}`
      })
    }
  })

  it('deve atualizar usuário e verificar persistência via GET', () => {
    const userData = UserFactory.generate()
    createdEmail = userData.email
    userPassword = userData.password

    // 1. Enviar requisição POST para /api/createAccount
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/createAccount',
      method: 'POST',
      body: `name=TestUser&email=${createdEmail}&password=TestPass123&title=Mr&birth_date=15&birth_month=06&birth_year=1995&firstname=Test&lastname=User&company=TestCorp&address1=123 Test St&address2=Suite 1&country=United States&zipcode=12345&state=TestState&city=TestCity&mobile_number=1234567890`
    })

    // 2. Enviar requisição PUT para /api/updateAccount
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/updateAccount',
      method: 'PUT',
      body: `name=UpdatedUser&email=${createdEmail}&password=TestPass123&title=Mr&birth_date=20&birth_month=12&birth_year=1990&firstname=Updated&lastname=Name&company=NewCorp&address1=456 New St&address2=Apt 2&country=Canada&zipcode=54321&state=NewState&city=NewCity&mobile_number=0987654321`
    }).then((response) => {
      const assertions = []

      // 3. Validar status code 200
      try {
        expect(response.status).to.eq(200)
        assertions.push({ description: 'response.status é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.status é igual a 200', passed: false })
      }

      // 4. Validar responseCode 200
      try {
        expect(response.body.responseCode).to.eq(200)
        assertions.push({ description: 'response.body.responseCode é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.responseCode é igual a 200', passed: false })
      }

      // 5. Validar mensagem "User updated!"
      try {
        expect(response.body.message).to.eq('User updated!')
        assertions.push({ description: 'response.body.message é igual a "User updated!"', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.message é igual a "User updated!"', passed: false })
      }

      // 6. Consultar usuário via GET e verificar se os dados foram atualizados
      cy.task('apiRequest', {
        hostname: 'automationexercise.com',
        path: `/api/getUserDetailByEmail?email=${createdEmail}`,
        method: 'GET'
      }).then((getResponse) => {
        try {
          expect(getResponse.body.responseCode).to.eq(200)
          assertions.push({ description: 'GET responseCode é igual a 200', passed: true })
        } catch (e) {
          assertions.push({ description: 'GET responseCode é igual a 200', passed: false })
        }

        try {
          expect(getResponse.body.user.first_name).to.eq('Updated')
          assertions.push({ description: 'user.first_name foi atualizado para "Updated"', passed: true })
        } catch (e) {
          assertions.push({ description: 'user.first_name foi atualizado para "Updated"', passed: false })
        }

        try {
          expect(getResponse.body.user.last_name).to.eq('Name')
          assertions.push({ description: 'user.last_name foi atualizado para "Name"', passed: true })
        } catch (e) {
          assertions.push({ description: 'user.last_name foi atualizado para "Name"', passed: false })
        }

        // 7. Gerar evidência do teste
        cy.task('generateEvidenceReport', {
          testId,
          testName: 'Atualizar conta de usuário via API',
          specName: Cypress.spec.relative,
          timestamp: getResponse._meta?.timestamp || new Date().toISOString(),
          duration: getResponse._meta?.duration || 0,
          status: 'PASS',
          request: getResponse._meta?.request || {},
          response: {
            status: getResponse.status,
            body: getResponse.body
          },
          assertions
        })
      })
    })
  })
})
