const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const WebpackShellPlugin = require("webpack-shell-plugin");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ["npm run server"],
    }),
  ],
});
