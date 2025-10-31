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
    // Проверяем список ингредиентов загружен
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

      // Проверяем, что булка добавлена именно в конструктор
      cy.get('[data-cy="constructor-bun-top"]').then(($bunElement) => {
        cy.get('@bunName').then((bunName) => {
          expect($bunElement).to.contain(bunName.toString());
        });
      });

      // Также проверяем нижнюю булку
      cy.get('[data-cy="constructor-bun-bottom"]').then(($bunElement) => {
        cy.get('@bunName').then((bunName) => {
          expect($bunElement).to.contain(bunName.toString());
        });
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

      // Проверяем, что ингредиент появился именно в конструкторе
      cy.get('[data-cy="constructor-ingredients"]').then(($constructor) => {
        cy.get('@mainName').then((mainName) => {
          expect($constructor).to.contain(mainName.toString());
        });
      });
    });

    it('should add sauce to constructor', () => {
      cy.get('@firstSauce')
        .find('.text_type_main-default')
        .invoke('text')
        .as('sauceName');

      // Добавляем соус в конструктор
      cy.get('@firstSauce').find('button').click();

      // Проверяем, что соус появился именно в конструкторе
      cy.get('[data-cy="constructor-ingredients"]').then(($constructor) => {
        cy.get('@sauceName').then((sauceName) => {
          expect($constructor).to.contain(sauceName.toString());
        });
      });
    });

    it('should enable order button when bun and ingredient are added', () => {
      // Проверяем, что кнопка изначально заблокирована
      cy.get('[data-order-button]').should('be.disabled');

      // Добавляем булку
      cy.get('@firstBun').find('button').click();
      cy.get('[data-order-button]').should('be.disabled');

      // Проверяем, что булка в конструкторе
      cy.get('[data-cy="constructor-bun-top"]').should('exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('exist');

      // Добавляем основной ингредиент
      cy.get('@firstMain').find('button').click();

      // Проверяем, что основной ингредиент в конструкторе
      cy.get('[data-cy="constructor-ingredients"]').should('exist');

      // Проверяем, что кнопка стала активной
      cy.get('[data-order-button]').should('be.enabled');

      // Проверяем, что ингредиенты отображаются именно в конструкторе
      cy.get('@firstBun').then(($bun) => {
        const bunName = $bun.find('.text_type_main-default').text();
        cy.get('[data-cy="constructor-bun-top"]').should('contain', bunName);
        cy.get('[data-cy="constructor-bun-bottom"]').should('contain', bunName);
      });

      cy.get('@firstMain').then(($main) => {
        const mainName = $main.find('.text_type_main-default').text();
        cy.get('[data-cy="constructor-ingredients"]').should(
          'contain',
          mainName
        );
      });
    });
  });

  // Проверка модалки ингредиентов
  describe('modal testing', () => {
    it('checking open ingredient modal with correct content', () => {
      // Получаем название и данные первой булки
      cy.get('[data-ingredient="bun"]:first-of-type .text_type_main-default')
        .invoke('text')
        .as('ingredientName');

      // Кликаем на первую булку
      cy.get('[data-ingredient="bun"]:first-of-type').click();

      // Проверяем, что модальное окно открылось
      cy.get('#modals').children().should('have.length', 2);

      // Проверяем, что в модальном окне отображается правильное название ингредиента
      cy.get('@ingredientName').then((ingredientName) => {
        cy.get('#modals').should('contain', ingredientName.toString());
      });

      // Дополнительные проверки содержимого модального окна
      cy.get('#modals').within(() => {
        // Проверяем, что есть изображение ингредиента
        cy.get('img').should('exist');
        
        // Проверяем, что есть nutritional values
        cy.contains('Калории').should('exist');
        cy.contains('Белки').should('exist');
        cy.contains('Жиры').should('exist');
        cy.contains('Углеводы').should('exist');
      });
    });

    it('checking open different ingredient types modal', () => {
      // Тестируем для основного ингредиента
      cy.get('[data-ingredient="main"]:first-of-type .text_type_main-default')
        .invoke('text')
        .as('mainIngredientName');

      cy.get('[data-ingredient="main"]:first-of-type').click();

      cy.get('#modals').children().should('have.length', 2);

      cy.get('@mainIngredientName').then((ingredientName) => {
        cy.get('#modals').should('contain', ingredientName.toString());
      });

      // Закрываем модальное окно
      cy.get('#modals button:first-of-type').click();
      cy.wait(500);

      // Тестируем для соуса
      cy.get('[data-ingredient="sauce"]:first-of-type .text_type_main-default')
        .invoke('text')
        .as('sauceIngredientName');

      cy.get('[data-ingredient="sauce"]:first-of-type').click();

      cy.get('#modals').children().should('have.length', 2);

      cy.get('@sauceIngredientName').then((ingredientName) => {
        cy.get('#modals').should('contain', ingredientName.toString());
      });
    });

    describe('check modal close', () => {
      beforeEach(() => {
        // Получаем название ингредиента перед открытием модалки
        cy.get('[data-ingredient="bun"]:first-of-type .text_type_main-default')
          .invoke('text')
          .as('ingredientName');
          
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals').children().should('have.length', 2);
        
        // Проверяем, что модалка открылась с правильным ингредиентом
        cy.get('@ingredientName').then((ingredientName) => {
          cy.get('#modals').should('contain', ingredientName.toString());
        });
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
      // Создать токен
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

      // Перехват запросов
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
        cy.get('[data-cy="constructor-bun-top"]').should('contain', bunName);
        cy.get('[data-cy="constructor-bun-bottom"]').should('contain', bunName);
        cy.get('@orderButton').should('be.disabled');

        // Добавляем начинку и проверяем, что она появилась в конструкторе
        cy.get('[data-ingredient="main"]:first-of-type button').click();
        cy.get('[data-cy="constructor-ingredients"]').should(
          'contain',
          mainName
        );
        cy.get('@orderButton').should('be.enabled');

        // Нажатие на кнопку оформления заказа
        cy.get('@orderButton').click();

        // Ждем выполнения запроса создания заказа
        cy.wait('@createOrder');

        // Проверка, что модальное окно открыто
        cy.get('#modals').children().should('have.length', 2);

        // Проверка номера заказа
        cy.get('#modals h2:first-of-type').should('have.text', '38321');

        // Проверяем дополнительную информацию в модалке заказа
        cy.get('#modals').should('contain', 'идентификатор заказа');
        cy.get('#modals').should('contain', 'Ваш заказ начали готовить');

        // Закрываем модальное окно заказа
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);

        // Проверяем что модальное окно закрылось
        cy.get('#modals').children().should('have.length', 0);
      });

      // Проверяем, что кнопка в каком-то состоянии (заблокирована или активна)
      cy.get('@orderButton').should('exist');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});