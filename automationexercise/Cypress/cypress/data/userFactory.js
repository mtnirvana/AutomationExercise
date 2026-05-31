/**
 * UserFactory - Factory para geração de dados dinâmicos de usuário
 * Gera dados únicos para cada execução de teste
 * @version 1.0.0
 * @author Rafael Barelli
 */

export class UserFactory {
  /**
   * Gera um usuário com dados dinâmicos
   * @returns {Object} Objeto com dados do usuário
   */
  static generate() {
    const timestamp = Date.now()
    return {
      username: `User${timestamp}`,
      email: `user${timestamp}@example.com`,
      password: 'Test123456',
      gender: 'male',
      day: '15',
      month: 'May',
      year: '1990',
      newsletter: true,
      specialOffers: true,
      address: {
        firstName: 'Test',
        lastName: 'User',
        company: 'Test Company',
        address1: '123 Test Street',
        address2: 'Apt 456',
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        zipcode: '90001',
        mobileNumber: '1234567890',
      },
    }
  }
}