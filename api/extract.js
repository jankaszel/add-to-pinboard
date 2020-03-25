const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const cors = require('micro-cors')()
const { validUrl } = require("../lib/url");

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

async function extractMetadata(url) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  });

  const page = await browser.newPage();
  await page.goto(url);
  await wait(2000);

  return {
    title: await page.title()
  };
}

const handler = async (req, res) => {
  const { url } = req.query;

  if (!url || !validUrl(url)) {
    res.status(400).send("Bad Request");
    return;
  }

  const meta = await extractMetadata(url);
  res.status(200).send({
    title: meta.title
  });
};

module.exports = cors(handler)
