# Add to Pinboard 📬

[Pinboard's](https://pinboard.in/) UI for adding URLs is... simple. For one, you need to specify the entry title by yourself, while taking the website's title from its metadata would be more convenient. This small tool uses a headless Chromium browser via [Puppeteer](https://github.com/puppeteer/puppeteer/) to extract a website's metadata directly and provides a simple UI for easily adding URLs to Pinboard.

This project uses [Svelte](https://svelte.dev/) for building the frontend and Node.js on the backend. More precisely, frontend and backend are set up in a way to be run on the [Zeit Vercel](https://zeit.co/) infrastructure for easy deployments.

## Get started

With a recent Node.js (`>= 13.6`), install all dependencies via `npm install`. Then:
* Start a [Rollup](https://rollupjs.org) development server via `npm run dev` and navigate to [`http://localhost:5000/`](http://localhost:5000).
* Create a production build via `npm run build`.
* Run a local web server via `npm start`.

By default, the development server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

As we use a particular version of Puppeteer that [works in serverless environments](https://zeit.co/blog/serverless-chrome), the backend for extracting a website's metadata (`/api/extract`) won't likely work on your local machine. Thus, all API calls should be pointing to a production service such as `https://add-to-pinboard.vercel.app/`, even in development. I'd be happy to fix that soon! 

## Deploying to the web

For using [vercel](https://vercel.com/), install the CLI application if you haven't already:

```bash
npm install -g vercel
```

Then, simply run `vercel` in the repository's root.
