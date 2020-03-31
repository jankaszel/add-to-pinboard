const fetch = require("node-fetch");
const cors = require("micro-cors")();
const qs = require("qs");

const submap = (object, keys) =>
  keys.reduce((acc, val) => ({ ...acc, [val]: object[val] }), {});

async function addBookmark(token, url, title, opts = {}) {
  const query = {
    auth_token: token,
    url,
    description: title,
    tags: Array.isArray(opts.tags) ? opts.tags.join(" ") : "",
    shared: opts.public || false ? "yes" : "no",
    toread: opts.toRead || true ? "yes" : "no"
  };
  if (opts.description) {
    query.extended = opts.description;
  }

  const res = await fetch(
    `https://api.pinboard.in/v1/posts/add?${qs.stringify(query)}`
  );
  if (res.status !== 200) {
    throw new Error(res.statusText);
  } else if (!(await res.text()).includes("done")) {
    throw new Error("Unexpected API response");
  }
}

const handler = async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send("OK");
  } else if (req.method === "GET") {
    return res.status(404).send("Not Found");
  }

  const { body } = req;

  try {
    await addBookmark(
      body.token,
      body.url,
      body.title,
      submap(body, ["description", "tags", "share", "toRead"])
    );

    res.status(200).send("OK");
  } catch (err) {
    res.status(500).send(`Internal Server Error: ${err}`);
  }
};

module.exports = cors(handler);
