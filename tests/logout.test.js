const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const fs = require('fs');

describe('Logout del usuario', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Debe cerrar la sesión del usuario y regresar al login', async () => {
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    await driver.wait(until.elementLocated(By.id('react-burger-menu-btn')), 5000);
    await driver.findElement(By.id('react-burger-menu-btn')).click();
    await driver.sleep(1000); 
    await driver.findElement(By.id('logout_sidebar_link')).click();

    await driver.wait(until.urlContains('saucedemo.com'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal('https://www.saucedemo.com/');

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('./screenshots/logout.png', screenshot, 'base64');
  });
});
