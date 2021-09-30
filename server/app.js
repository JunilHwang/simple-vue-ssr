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

app.use(express.static('./public'));

app.get("/*", async (req, res) => {
  res.send(await renderer.renderToString({ url: req.url }));
});

app.listen(3000, () => {
  console.log('listen to http://localhost:3000')
})