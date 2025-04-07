const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const fs = require('fs');

describe('Agregar producto al carrito', function () {
  this.timeout(30000);
  let driver;
 
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Debe permitir agregar un producto al carrito', async () => {
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    await driver.wait(until.elementLocated(By.css('.inventory_list')), 5000);
    await driver.findElement(By.css('.inventory_item button')).click(); 

    const cartBadge = await driver.findElement(By.className('shopping_cart_badge'));
    const count = await cartBadge.getText();
    expect(count).to.equal('1');

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('./screenshots/add_to_cart.png', screenshot, 'base64');
  });
});
