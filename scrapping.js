const puppeteer = require('puppeteer');

async function scrapData (url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36")
  await page.goto(url);

  await page.screenshot({path:"exemple.png"});

  console.log(await page.content());

  browser.close();
}

scrapData("https://www.flightsfrom.com/CDG-LHR");
