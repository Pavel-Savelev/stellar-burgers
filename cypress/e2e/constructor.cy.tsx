/// <reference types="cypress" />

import * as orderFixture from '../fixtures/order.json';

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
  //   Проверка модалки
  describe('modal testing', () => {
    it('checking open modal', () => {
      cy.get('[data-ingredient="bun"]:first-of-type').click();
      cy.get('#modals').children().should('have.length', 2);
    });

    describe('check modal close', () => {
      it('close from cross', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('close from overlay', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('close from Escape', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
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
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

      cy.visit('/');
    });

    it('checking form functions', () => {
      // Проверяем, что кнопка изначально заблокирована
      cy.get('[data-order-button]').should('be.disabled');

      // Кликаем по первой булке
      cy.get('[data-ingredient="bun"]:first-of-type button').click();
      cy.get('[data-order-button]').should('be.disabled');

      // Кликаем по первой начинке
      cy.get('[data-ingredient="main"]:first-of-type button').click();

      // Кнопка должна стать активной
      cy.get('[data-order-button]').should('be.enabled');

      // Нажатие на кнопку оформления заказа
      cy.get('[data-order-button]').click();

      // Проверка, что модальное окно открыто
      cy.get('#modals').children().should('have.length', 2);

      // Проверка номера заказа
      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFixture.order.number
      );

      // После оформления кнопка заблокирована
      cy.get('[data-order-button]').should('be.disabled');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
