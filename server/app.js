const express = require("express");
const ssrService = require("./src/ssr.service");
const store = require("./src/store");

const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.get("/api/state", (req, res) => {
  res.json(store.state);
})

app.put("/api/state", (req, res) => {
  store.setState(req.body);
  res.status(204).send();
})

app.get("/*", async ({ url }, res) => {
  const { state } = store;
  res.send(await ssrService.getHtml({ url, state }));
});

app.listen(3000, () => {
  console.log('listen to http://localhost:3000')
})