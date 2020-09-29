const chromium = require("chrome-aws-lambda");
const cors = require("micro-cors")();
const { validUrl } = require("../lib/url");

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

async function extractMetadata(url) {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto(url);
  await wait(1000);

  return {
    title: await page.title()
  };
}

const handler = async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send("OK");
  }

  const { url } = req.query;

  if (!url || !validUrl(url)) {
    return res.status(400).send("Bad Request");
  }

  const meta = await extractMetadata(url);
  res.status(200).send({
    title: meta.title
  });
};

module.exports = cors(handler);
