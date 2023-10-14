const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",

  // Method 1: Without using plugin by make to files(main.css,index.ts)
  // into entry property and resolve them into two [name].bundle.js files in the dest folder
  entry: {
    app: "./src/index.ts",
    style: "./src/main.css",
  },
  output: {
    filename: "js/[name].bundle.js", // Output JavaScript to a 'js' directory
    path: path.resolve(__dirname, "dist"),
  },

  devtool: "inline-source-map",
  plugins: [
    //Method 2: Using MiniCssExtractPlugin, this plugin will extract CSS into separate files.
    new MiniCssExtractPlugin({
      filename: "css/output.css", // Output CSS to a 'css' directory
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "index.html"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader", // Add PostCSS loader for processing
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 8080,
  },
};
