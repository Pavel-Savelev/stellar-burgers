/// <reference types="cypress" />

const API_URL = 'https://norma.education-services.ru/api';

describe('testing components from constructor page', () => {
  beforeEach(() => {
    // Мокаем API для ингредиентов
    cy.intercept('GET', `${API_URL}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // Открываем страницу ждём подгрузки данных
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('check items from constructor list', () => {
    cy.get('[data-ingredient="bun"]').should('have.length.at.least', 1);
    cy.get('[data-ingredient="main"],[data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  // Тестирование добавления ингредиентов в конструктор
  describe('constructor functionality', () => {
    beforeEach(() => {
      cy.get('[data-ingredient="bun"]').first().as('firstBun');
      cy.get('[data-ingredient="main"]').first().as('firstMain');
      cy.get('[data-ingredient="sauce"]').first().as('firstSauce');
    });

    it('should add bun to constructor', () => {
      cy.get('@firstBun')
        .find('.text_type_main-default')
        .invoke('text')
        .as('bunName');

      // Добавляем булку в конструктор
      cy.get('@firstBun').find('button').click();

      cy.get('@bunName').then((bunName) => {
        cy.contains(bunName.toString()).should('exist');
      });
    });

    it('should add main ingredient to constructor', () => {
      // Получаем название основного ингредиента до добавления
      cy.get('@firstMain')
        .find('.text_type_main-default')
        .invoke('text')
        .as('mainName');

      // Добавляем основной ингредиент в конструктор
      cy.get('@firstMain').find('button').click();

      // Проверяем, что ингредиент появился в конструкторе
      cy.get('@mainName').then((mainName) => {
        cy.contains(mainName.toString()).should('exist');
      });
    });

    it('should add sauce to constructor', () => {
      cy.get('@firstSauce')
        .find('.text_type_main-default')
        .invoke('text')
        .as('sauceName');

      // Добавляем соус в конструктор
      cy.get('@firstSauce').find('button').click();

      // Проверяем, что соус появился в конструкторе
      cy.get('@sauceName').then((sauceName) => {
        cy.contains(sauceName.toString()).should('exist');
      });
    });

    it('should enable order button when bun and ingredient are added', () => {
      // Проверяем, что кнопка изначально заблокирована
      cy.get('[data-order-button]').should('be.disabled');

      // Добавляем булку
      cy.get('@firstBun').find('button').click();
      cy.get('[data-order-button]').should('be.disabled');

      // Добавляем основной ингредиент
      cy.get('@firstMain').find('button').click();

      // Проверяем, что кнопка стала активной
      cy.get('[data-order-button]').should('be.enabled');

      // Проверяем, что ингредиенты отображаются в конструкторе
      cy.get('@firstBun').then(($bun) => {
        const bunName = $bun.find('.text_type_main-default').text();
        cy.contains(bunName).should('exist');
      });

      cy.get('@firstMain').then(($main) => {
        const mainName = $main.find('.text_type_main-default').text();
        cy.contains(mainName).should('exist');
      });
    });
  });

  //   Проверка модалки
  describe('modal testing', () => {
    it('checking open modal', () => {
      cy.get('[data-ingredient="bun"]:first-of-type').click();
      cy.get('#modals').children().should('have.length', 2);
    });

    describe('check modal close', () => {
      beforeEach(() => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals').children().should('have.length', 2);
      });

      it('close from cross', () => {
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('close from overlay', () => {
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('close from Escape', () => {
        cy.get('body').type('{esc}');
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });

  describe('Check order', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', {
        success: true,
        name: 'EXAMPLE_ORDER_NAME',
        order: {
          number: 38321
        }
      }).as('createOrder');
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
      cy.intercept('GET', 'api/orders/all', {
        body: {
          orders: [],
          total: 0,
          totalToday: 0
        }
      });

      cy.visit('/');
    });

    it('checking form functions', function () {
      cy.get('[data-order-button]').as('orderButton');

      cy.get('[data-ingredient="bun"]:first-of-type .text_type_main-default')
        .invoke('text')
        .as('bunName');

      cy.get('[data-ingredient="main"]:first-of-type .text_type_main-default')
        .invoke('text')
        .as('mainName');

      cy.get('@orderButton').should('be.disabled');

      cy.then(function () {
        const { bunName, mainName } = this;

        // Добавляем булку и проверяем, что она появилась в конструкторе
        cy.get('[data-ingredient="bun"]:first-of-type button').click();
        cy.contains(bunName).should('exist');
        cy.get('@orderButton').should('be.disabled');

        // Добавляем начинку и проверяем, что она появилась в конструкторе
        cy.get('[data-ingredient="main"]:first-of-type button').click();
        cy.contains(mainName).should('exist');
        cy.get('@orderButton').should('be.enabled');

        cy.get('@orderButton').click();

        cy.wait('@createOrder');
        
        cy.get('#modals').children().should('have.length', 2);

        // Проверка номера заказа
        cy.get('#modals h2:first-of-type').should('have.text', '38321');

        // Закрываем модальное окно заказа
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);

        // Проверяем что модальное окно закрылось
        cy.get('#modals').children().should('have.length', 0);
      });

      cy.get('@orderButton').should('exist');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
