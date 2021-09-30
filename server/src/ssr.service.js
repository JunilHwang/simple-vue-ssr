const { createBundleRenderer } = require("vue-server-renderer");
const fs = require('fs');
const { join } = require('path');

const ssrTemplatePath = join(process.cwd(), 'template/ssr_index.html');
const csrTemplatePath = join(process.cwd(), 'template/index.html');
const template = fs.readFileSync(ssrTemplatePath, 'utf-8');
const csrTemplate = fs.readFileSync(csrTemplatePath);

const bundle = require("../public/vue-ssr-server-bundle.json");
const clientManifest = require("../public/vue-ssr-client-manifest.json");
const renderer = createBundleRenderer(bundle, { clientManifest, template });

module.exports = {
  async getHtml (context) {
    try {
      return await renderer.renderToString(context);
    } catch (e) {
      return csrTemplate;
    }
  }
}