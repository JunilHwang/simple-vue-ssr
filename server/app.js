const express = require("express");
const { createBundleRenderer } = require("vue-server-renderer");

const template = `
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>SSR</title>
  </head>
  <body>
    <!--vue-ssr-outlet-->
    {{{ renderState() }}}
    {{{ renderScripts() }}}
  </body>
</html>
`;

const bundle = require("./public/vue-ssr-server-bundle.json");
const clientManifest = require("./public/vue-ssr-client-manifest.json");
const renderer = createBundleRenderer(bundle, { clientManifest, template });

const app = express();
const store = {
  state: {
    todoItems: [
      { id: 1, content: 'CSR을 만들어보자', activation: true },
      { id: 2, content: 'CSR 코드 분할', activation: true },
      { id: 3, content: 'SSR을 만들어보자', activation: false },
    ],
  },
  setState (newState) {
    this.state = { ...this.state, ...newState };
  }
}

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
  res.send(await renderer.renderToString({ url, state }));
});

app.listen(3000, () => {
  console.log('listen to http://localhost:3000')
})