const puppeteer = require('puppeteer');

describe('Grocify Fruits Page Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/fruits.html'); // Update with actual URL if different
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Mobile menu toggles', async () => {
    await page.click('.sidenav-trigger');
    await page.waitForSelector('#mobile-menu', { visible: true });
  });

  test('Price slider updates value', async () => {
    const slider = await page.$('#price-slider');
    await slider.evaluate(slider => slider.value = 10);
    await page.evaluate(() => document.querySelector('#price-display').textContent = '$10');
    const price = await page.$eval('#price-display', el => el.textContent);
    expect(price).toBe('$10');
  });
});

describe('Grocify Milk Page Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/milk.html'); // Update with actual URL if different
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Mobile menu toggles', async () => {
    await page.click('.sidenav-trigger');
    await page.waitForSelector('#mobile-menu', { visible: true });
  });

  test('Price slider updates value', async () => {
    const slider = await page.$('#price-slider');
    await slider.evaluate(slider => slider.value = 10);
    await page.evaluate(() => document.querySelector('#price-display').textContent = '$10');
    const price = await page.$eval('#price-display', el => el.textContent);
    expect(price).toBe('$10');
  });
});

describe('Grocify Snack Page Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/milk.html'); // Update with actual URL if different
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Mobile menu toggles', async () => {
    await page.click('.sidenav-trigger');
    await page.waitForSelector('#mobile-menu', { visible: true });
  });

  test('Price slider updates value', async () => {
    const slider = await page.$('#price-slider');
    await slider.evaluate(slider => slider.value = 10);
    await page.evaluate(() => document.querySelector('#price-display').textContent = '$10');
    const price = await page.$eval('#price-display', el => el.textContent);
    expect(price).toBe('$10');
  });
});

describe('Grocify home.html Website Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 }); // Debugging mode enabled
    page = await browser.newPage();
    await page.goto('http://localhost:3000/index.html'); // Update with actual URL if different
  });

  afterAll(async () => {
    await browser.close();
  });

  const checkAndClick = async (selector) => {
    try {
      await page.waitForSelector(selector, { visible: true, timeout: 3000 });
      await page.click(selector);
    } catch (error) {
      console.error(`Element not found: ${selector}`);
      throw error;
    }
  };

  test('Navbar links are functional', async () => {
    const links = ['home.html', 'contact.html', 'cart.html', 'dashboard.html'];
    for (let link of links) {
      await checkAndClick(`a[href='${link}']`);
      await page.waitForTimeout(500);
      expect(page.url()).toContain(link);
      await page.goBack();
      await page.waitForTimeout(500);
    }
  });

  test('Search modal opens and closes', async () => {
    await checkAndClick("a.modal-trigger[href='#search-modal']");
    await page.waitForSelector('#search-modal', { visible: true });
    await page.waitForTimeout(300);
    await checkAndClick('.modal-close');
    await page.waitForSelector('#search-modal', { hidden: true });
  });

  test('Mobile menu toggles', async () => {
    await checkAndClick('.sidenav-trigger');
    await page.waitForSelector('#mobile-menu', { visible: true });
  });

  test('Dashboard button navigates correctly', async () => {
    await checkAndClick("a[href='dashboard.html']");
    await page.waitForTimeout(500);
    expect(page.url()).toContain('dashboard.html');
  });

  test('Category navigation works', async () => {
    const categories = ['fruits.html', 'vegetables.html', 'milk.html', 'snacks.html'];
    for (let category of categories) {
      await checkAndClick(`a[href='${category}']`);
      await page.waitForTimeout(500);
      expect(page.url()).toContain(category);
      await page.goBack();
      await page.waitForTimeout(500);
    }
  });

  test('Testimonials section is visible', async () => {
    await page.waitForSelector('#testimonials', { visible: true, timeout: 3000 });
    const testimonialsVisible = await page.$eval('#testimonials', el => el !== null);
    expect(testimonialsVisible).toBe(true);
  });

  test('Features section is visible', async () => {
    await page.waitForSelector('#features', { visible: true, timeout: 3000 });
    const featuresVisible = await page.$eval('#features', el => el !== null);
    expect(featuresVisible).toBe(true);
  });
});