/// <reference types="cypress" />

describe('template spec', () => {
    const email = 'pespatron@gmail.com';
    const password = 'harnaUkrainkaJa';
    const wrongEmail = 'patron@gmail.com';
  it('should provide an ability to Login with valid credinals', () => {
      cy.visit('/login')
      cy.findbyPlaceholder('jane.doe@gmail.com')
        .type(email);
      cy.findbyPlaceholder('*********')
        .type(password);
      cy.get('.inline-block')
        .click();
      cy.get('.text-white')
        .should ('contain', ' Hello my dear friend, ')
  });

  it('should not provide an ability to Login with invalid email', () => {
      cy.visit('/login')
      cy.findbyPlaceholder('jane.doe@gmail.com')
        .type(wrongEmail);
      cy.findbyPlaceholder('*********')
        .type(password);
      cy.get('.inline-block')
        .click();
      cy.get('.text-brand-danger')      
        .should ('contain', 'No such user')
  });

  it('should display an error message for invalid email format', () => {
      cy.visit('/login');
    const invalidFormatEmail = 'invalidemailgmail.com';
      cy.findbyPlaceholder('jane.doe@gmail.com')
        .type(invalidFormatEmail);
      cy.findbyPlaceholder('*********')
        .type(password);
      cy.get('.inline-block')
        .click();
      cy.get('.text-brand-danger')
        .should('contain', '*Це поле має бути електронною поштою');
  });

  it('should display an alert when the email field is empty', () => {
      cy.visit('/login');
      cy.findbyPlaceholder('*********')
        .type(password);
      cy.get('.inline-block').click();
      cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Please fill out this field.');
  });
  });
  it('should display an alert when the password field is empty', () => {
      cy.visit('/login');
      cy.findbyPlaceholder('jane.doe@gmail.com')
        .type(email);
      cy.get('.inline-block').click();
      cy.on('window:alert', (alertText) => {
   expect(alertText).to.equal('Please fill out this field.');
 });
 });

  it('should not provide an ability to Login with invalid password', () => {
      cy.visit('/login')
    const wrongPassword = 'harnaUkrainka';
      cy.findbyPlaceholder('jane.doe@gmail.com')
        .type(email);
      cy.findbyPlaceholder('*********')
        .type(wrongPassword);
      cy.get('.inline-block')
        .click();
      cy.get('.text-brand-danger')      
        .should ('contain', 'Wrong password')
 });

   it('should display an error when the field has less than 3 characters', () => {
      cy.visit('/login')
    const invalidPassword = 'ha';
      cy.findbyPlaceholder('jane.doe@gmail.com')
        .type(email);
      cy.findbyPlaceholder('*********')
        .type(invalidPassword);
      cy.get('.inline-block')
        .click();
      cy.get('.text-brand-danger')
        .should('contain', '*Це поле має бути щонайменше 3 символами!');
  });

  it('should navigate to the forgot password page', () => {
      cy.visit('/login');
      cy.contains('Забули свій пароль?').click();
      cy.url().should('include', '/forgot_password');
  });

  it('should reset the password successfully', () => {
      cy.visit('/login');
      cy.contains('Забули свій пароль?')
        .click();
      cy.url().should('include', '/forgot_password');
      cy.findbyPlaceholder('jane.doe@gmail.com')
       .type(email);
      cy.get('.inline-block')
        .click();
      cy.get('.text-brand-main')      
        .should ('contain', 'harnaUkrainkaJa')
  });

    it('should show an error for invalid email to reset password', () => {
      cy.visit('/forgot_password');
      cy.findbyPlaceholder('jane.doe@gmail.com')
        .type(wrongEmail);
      cy.contains('Отримати пароль')
        .click();
      cy.get('.text-brand-danger')      
        .should ('contain', 'No such user')
  });

    it('should display window alert when trying to reset password without providing an email', () => {
      cy.visit('/forgot_password');
      cy.contains('Отримати пароль')
        .click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Please fill out this field.');
      });
  });

    it('should navigate back to login', () => {
      cy.visit('/forgot_password');
      cy.contains('Повернутися до входу?')
        .click();
      cy.url().should('include', '/login');
    });
  });
