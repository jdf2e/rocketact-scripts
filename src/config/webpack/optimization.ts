const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    if (isProductionEnv()) {
      webpackChain.optimization
        .minimizer("script")
        .use(UglifyJsPlugin, [
          {
            cache: true,
            parallel: true,
            uglifyOptions: {
              ecma: 5,
              mangle: true,
              compress: {
                drop_console: true
              }
            },
            sourceMap: false
          }
        ])
        .end()
        .minimizer("css")
        .use(OptimizeCSSAssetsPlugin, [
          {
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorOptions: {
              reduceIdents: false,
              mergeIdents: false,
              discardUnused: false,
              autoprefixer: false,
              zindex: false,
              map: false
            }
          }
        ])
        .end();
    }
  });
};
