/// <reference types="cypress" />

describe('Testa as funções do usuário', () => {
  describe.only('Usuario permissao criar', () => {
    beforeEach(() => {
      cy.fixture('usuarios/criar').as('usuario').then((usuario) => {
        cy.login(usuario.email, usuario.senha)
      })
    })

    it('Login - permissão criar deve redirecionar para /templates', () => {
      cy.url().should('contain', '/templates')
    })

    it('Não deve poder utilizar templates', () => {
      cy.get('button.uploadArquivoBtn').should('not.exist')
    })

    it('Deve poder adicionar templates', () => {
      cy.contains(/Adicionar Novo Template/i)
    })

    it('Adicionando um template CSV', () => {
      //Espera a página carregar
      cy.wait(1000)
      
      //Adiciona o template
      cy.get('#adicionarTemplateBtn').click()
      cy.get('#inputNomeTemplate').type('Template Teste')
      cy.get('#inputNCampos').select('2')
      cy.get('.btn-group').get('label[for="csv"]').click()
      cy.get('#inputNomeCampo1').type('Nome')
      cy.get('#inputNomeCampo2').type('Idade')
      cy.get('#inputTipoCampo1').select('Texto')
      cy.get('#inputTipoCampo2').select('Inteiro')
      cy.get('#inputAnulavelCampo2').click()
      cy.intercept('POST', '/templates/criar').as('postTemplate')
      cy.get('#sendTemplate').click()
      cy.wait('@postTemplate').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(201)
      })
      cy.contains(/Aguardando verificação de um administrador/i).should('be.visible')
      cy.wait(400)
      cy.get('#feedbackModal').find('button.btn-close').click()
      cy.contains('.card-title', 'Template Teste')
        .closest('.card-body')
        .find('.form-check-label')
        .contains('Aguardando Revisão')
        .should('be.visible');
    })

    it.only('Alterar informações do usuário', () => {
      cy.contains(/Minha conta/i).click()
      //Altera o nome
      cy.get('#nome').clear().type('Nome')
      //Altera o sobrenome
      cy.get('#sobrenome').clear().type('Sobrenome')
      //Altera o telefone
      cy.get('#telefone').clear().type('123456789')

      //Verifica se os campos estão desabilitados
      cy.get('#email').should('be.disabled')
      cy.get('#idUsuario').should('be.disabled')
      cy.get('#permissao').should('be.disabled')

      //Salva as alterações
      cy.get('#salvarBtn').click()

      //Verifica se as alterações foram salvas
      cy.contains(/Dados Atualizados/i).should('be.visible')

      // Retorna os valores para os originais
      cy.fixture('usuarios/criar').as('usuario').then((usuario) => {
        cy.get('#nome').clear().type(usuario.nome)
        cy.get('#sobrenome').clear().type(usuario.sobrenome)
        cy.get('#telefone').clear().type(usuario.telefone)
        cy.get('#salvarBtn').click()
        cy.contains(/Dados Atualizados/i).should('be.visible')
      })
    })

  })

  describe('Usuario permissao upload', () => {
    beforeEach(() => {
      cy.fixture('usuarios/upload').as('usuario').then((usuario) => {
        cy.login(usuario.email, usuario.senha)
      })
    })

    it('Login - permissão upload deve redirecionar para /templates', () => {
      cy.url().should('contain', '/templates')
    })
  })

  describe('Usuario permissao admin', () => {
    beforeEach(() => {
      cy.fixture('usuarios/admin').as('usuario').then((usuario) => {
        cy.login(usuario.email, usuario.senha)
      })
    })
    it('Login - permissão admin deve redirecionar para /dashboard', () => {
      cy.url().should('contain', '/dashboard')
    })
  })
})