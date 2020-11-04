const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  plugins: [
    new CopyPlugin({
      patterns: [
        /*
        * Copy specific resources to server
        * */
        { from: './src/models', to: '../../server/src/resources/models' },
        { from: './src/validators', to: '../../server/src/resources/validators' },
      ],
    }),
  ],
};
