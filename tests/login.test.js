const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const fs = require('fs');

describe('Login exitoso', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Debe permitir login con credenciales válidas', async () => {
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    await driver.wait(until.urlContains('inventory'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('inventory');

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('./screenshots/login_success.png', screenshot, 'base64');
  });
});
