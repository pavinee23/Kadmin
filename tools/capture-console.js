const puppeteer = require('puppeteer');

(async () => {
  const out = {console: [], pageErrors: [], requestFailed: [], responses: []};
  try {
    const browser = await puppeteer.launch({args: ['--no-sandbox','--disable-setuid-sandbox']});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30000);

    page.on('console', msg => {
      try {
        out.console.push({type: msg.type(), text: msg.text(), args: msg.args().map(a => a.toString())});
      } catch (e) {}
    });

    page.on('pageerror', err => {
      out.pageErrors.push({message: err.message, stack: err.stack});
    });

    page.on('requestfailed', req => {
      out.requestFailed.push({url: req.url(), method: req.method(), failure: req.failure() && req.failure().errorText});
    });

    page.on('response', async res => {
      try {
        const status = res.status();
        if (status >= 400) {
          out.responses.push({url: res.url(), status});
        }
      } catch (e) {}
    });

    const url = process.argv[2] || 'https://k-energy.ngrok.app/main-login';
    await page.goto(url, {waitUntil: 'networkidle2'}).catch(()=>{});
    // wait a bit for client-side runtime errors
    await page.waitForTimeout(3000);

    console.log(JSON.stringify(out, null, 2));
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('ERROR', err && (err.stack || err.message || String(err)));
    console.log(JSON.stringify(out, null, 2));
    process.exit(2);
  }
})();
