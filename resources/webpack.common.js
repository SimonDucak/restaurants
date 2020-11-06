const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  plugins: [
    new CopyPlugin({
      patterns: [
        /*
        * Copy resources to server
        * */
        { from: './src/models', to: '../../server/src/resources/models' },
        { from: './src/validators', to: '../../server/src/resources/validators' },
        { from: './src/schemas', to: '../../server/src/resources/schemas' },
        { from: './src/mongooseTypes.ts', to: '../../server/src/resources/mongooseTypes.ts' },
        /*
        * Copy resources to console FE application
        * */
        { from: './src/models', to: '../../console/src/resources/models' },
        { from: './src/validators', to: '../../console/src/resources/validators' },
        { from: './src/schemas', to: '../../console/src/resources/schemas' },
        { from: './src/mongooseTypes.ts', to: '../../console/src/resources/mongooseTypes.ts' },
      ],
    }),
  ],
};
