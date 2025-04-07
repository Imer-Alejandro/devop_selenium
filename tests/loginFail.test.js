const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const fs = require('fs');

describe('Login fallido', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Debe mostrar mensaje de error al usar credenciales inválidas', async () => {
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('invalid_user');
    await driver.findElement(By.id('password')).sendKeys('wrong_pass');
    await driver.findElement(By.id('login-button')).click();

    const errorMsg = await driver.wait(
      until.elementLocated(By.css('[data-test="error"]')),
      5000
    );
    const text = await errorMsg.getText();
    expect(text).to.include('Username and password do not match');

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('./screenshots/login_fail.png', screenshot, 'base64');
  });
});
