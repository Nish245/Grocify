const puppeteer = require('puppeteer');

describe('Grocify Fruits Page Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    // await page.setViewport({ width: 1280, height: 800 }); // Set window size
    await page.goto('http://localhost:3000/fruits.html'); // Update with actual URL if different
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Mobile menu toggles', async () => {
    await page.click('.sidenav-trigger');
    await page.setViewport({ width: 950, height: 800 }); // Set window size
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
    // await page.setViewport({ width: 1280, height: 800 }); // Set window size
    await page.goto('http://localhost:3000/milk.html'); // Update with actual URL if different
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Mobile menu toggles', async () => {
    await page.click('.sidenav-trigger');
    await page.setViewport({ width: 950, height: 800 }); // Set window size
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
    // await page.setViewport({ width: 1280, height: 800 }); // Set window size
    await page.goto('http://localhost:3000/milk.html'); // Update with actual URL if different
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Mobile menu toggles', async () => {
    await page.click('.sidenav-trigger');
    await page.setViewport({ width: 950, height: 800 }); // Set window size
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
    // await page.setViewport({ width: 1280, height: 800 }); // Set window size
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
      await checkAndClick(`[a href='${link}']`);
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
    await page.setViewport({ width: 950, height: 800 }); // Set window size
    await page.waitForSelector('#mobile-menu', { visible: true });
  });

  test('Dashboard button navigates correctly', async () => {
    await page.setViewport({ width: 1280, height: 800 }); // Set window size
    await checkAndClick("[a href='dashboard.html']");
    await page.waitForTimeout(500);
    expect(page.url()).toContain('dashboard.html');
  });

  test('Category navigation works', async () => {
    const categories = ['fruits.html', 'vegetables.html', 'milk.html', 'snacks.html'];
    for (let category of categories) {
      await checkAndClick(`[a href='${category}']`);
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

describe('Grocify Authentication Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 }); // Debugging mode enabled
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 }); // Set window size
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

  describe('Reset Password Page Tests', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:3000/reset-password.html');
    });

    test('Reset password form validation', async () => {
      await page.waitForSelector('#reset-password-form', { visible: true });
      await page.type('#new-password', 'test123');
      await page.type('#confirm-password', 'wrongpassword');
      await checkAndClick("button[type='submit']");
      
      const errorMessage = await page.$eval('#reset-password-message', el => el.textContent);
      expect(errorMessage).toMatch(/Passwords do not match/i);
    });
  });

  describe('Registration Page Tests', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:3000/register.html');
    });

    test('Navbar links are functional', async () => {
      const links = ['/', '/#about-us', '/#our-products', 'contact.html', 'login.html'];
      for (let link of links) {
        await checkAndClick(`a[href='${link}']`);
        await page.waitForTimeout(500);
        expect(page.url()).toContain(link);
        await page.goBack();
        await page.waitForTimeout(500);
      }
    });

    test('Mobile menu toggles', async () => {
      await checkAndClick('.sidenav-trigger');
      await page.waitForSelector('#mobile-menu', { visible: true });
    });

    test('Register form validation - missing fields', async () => {
      await page.waitForSelector('#registerForm', { visible: true });
      await checkAndClick("button[type='submit']");
      
      const errorMessage = await page.evaluate(() => document.querySelector('input:invalid')?.validationMessage);
      expect(errorMessage).toBeTruthy();
    });

    test('Register form validation - invalid email', async () => {
      await page.waitForSelector('#registerForm', { visible: true });
      await page.type('#username', 'testuser');
      await page.type('#email', 'invalid-email');
      await page.type('#password', 'test123');
      await checkAndClick("button[type='submit']");
      
      const errorMessage = await page.evaluate(() => document.querySelector('#email').validationMessage);
      expect(errorMessage).toMatch(/valid email address/i);
    });

    test('Register form submits successfully', async () => {
      await page.waitForSelector('#registerForm', { visible: true });
      await page.type('#username', 'testuser');
      await page.type('#email', 'testuser@example.com');
      await page.type('#password', 'test123');
      await checkAndClick("button[type='submit']");
      
      await page.waitForTimeout(500);
      const successMessage = await page.evaluate(() => document.querySelector('#registerForm').textContent);
      expect(successMessage).toMatch(/account created successfully/i);
    });
  });

  describe('Login Page Tests', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:3000/login.html');
    });

    test('Navbar links are functional', async () => {
      const links = ['/', '/#about-us', '/#our-products', 'contact.html', 'register.html'];
      for (let link of links) {
        await checkAndClick(`a[href='${link}']`);
        await page.waitForTimeout(500);
        expect(page.url()).toContain(link);
        await page.goBack();
        await page.waitForTimeout(500);
      }
    });

    test('Mobile menu toggles', async () => {
      await checkAndClick('.sidenav-trigger');
      await page.waitForSelector('#mobile-menu', { visible: true });
    });

    test('Login form validation - missing fields', async () => {
      await page.waitForSelector('#loginForm', { visible: true });
      await checkAndClick("button[type='submit']");
      
      const errorMessage = await page.evaluate(() => document.querySelector('input:invalid')?.validationMessage);
      expect(errorMessage).toBeTruthy();
    });

    test('Login form validation - incorrect credentials', async () => {
      await page.waitForSelector('#loginForm', { visible: true });
      await page.type('#email', 'wronguser@example.com');
      await page.type('#password', 'wrongpassword');
      await checkAndClick("button[type='submit']");
      
      const errorMessage = await page.evaluate(() => document.querySelector('#loginForm').textContent);
      expect(errorMessage).toMatch(/Invalid email or password/i);
    });

    test('Login form submits successfully', async () => {
      await page.waitForSelector('#loginForm', { visible: true });
      await page.type('#email', 'testuser@example.com');
      await page.type('#password', 'test123');
      await checkAndClick("button[type='submit']");
      
      await page.waitForTimeout(500);
      const successMessage = await page.evaluate(() => document.querySelector('#loginForm').textContent);
      expect(successMessage).toMatch(/Welcome back/i);
    });
  });
});

describe('Grocify Price Check Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 }); // Debugging mode enabled
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 }); // Set window size
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

  describe('Price Check Page Tests', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:3000/pricecheck.html');
    });

    test('Navbar links are functional', async () => {
      const links = ['/', '/#about-us', '/#our-products', 'login.html', 'register.html'];
      for (let link of links) {
        await checkAndClick(`a[href='${link}']`);
        await page.waitForTimeout(500);
        expect(page.url()).toContain(link);
        await page.goBack();
        await page.waitForTimeout(500);
      }
    });

    test('Mobile menu toggles', async () => {
      await checkAndClick('.sidenav-trigger');
      await page.waitForSelector('#mobile-menu', { visible: true });
    });

    test('Category filter updates results', async () => {
      await page.waitForSelector('#categoryFilters', { visible: true });
      const initialText = await page.$eval('#productTable tbody', el => el.textContent);
      await checkAndClick('#categoryFilters input:first-child'); // Click the first category
      await page.waitForTimeout(500);
      const updatedText = await page.$eval('#productTable tbody', el => el.textContent);
      expect(updatedText).not.toBe(initialText);
    });

    test('Price slider updates display', async () => {
      await page.waitForSelector('#price-slider', { visible: true });
      await page.$eval('#price-slider', slider => slider.value = 10);
      await page.evaluate(() => document.querySelector('#price-display').textContent = '$10');
      const price = await page.$eval('#price-display', el => el.textContent);
      expect(price).toBe('$10');
    });

    test('Product table populates with data', async () => {
      await page.waitForSelector('#productTable tbody', { visible: true });
      const rowCount = await page.$$eval('#productTable tbody tr', rows => rows.length);
      expect(rowCount).toBeGreaterThan(0);
    });
  });
});