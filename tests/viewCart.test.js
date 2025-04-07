const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const fs = require('fs');

describe('Visualizar carrito', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Debe mostrar el producto en el carrito después de agregarlo', async () => {
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    await driver.wait(until.elementLocated(By.css('.inventory_list')), 5000);
    await driver.findElement(By.css('.inventory_item button')).click(); 
    await driver.findElement(By.className('shopping_cart_link')).click();
    await driver.wait(until.urlContains('cart'), 5000);

    const cartItems = await driver.findElements(By.className('cart_item'));
    expect(cartItems.length).to.be.greaterThan(0);

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('./screenshots/view_cart.png', screenshot, 'base64');
  });
});
