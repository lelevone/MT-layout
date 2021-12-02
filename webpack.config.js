const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const fs = require("fs");

const distPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, 'src');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: true,
    })
  })
}

const htmlPlugins = generateHtmlPlugins("./src/html/views");
module.exports = {
  entry: ["@babel/polyfill",
    "./src/js/index.js",
    "./src/scss/style.scss"
  ],
  output: {
    filename: "bundle.[contenthash].js",
    path: distPath
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: srcPath + "/js",
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html/includes'),
        loader: 'html-loader'
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: srcPath + "/img",
          to: distPath + "/img"
        },
        {
          from: srcPath + "/favicon",
          to: distPath + "/favicon"
        }
      ]
    }),
    new CleanWebpackPlugin()
  ].concat(htmlPlugins),
  devServer: {
    liveReload: true,
    hot: false
  }
}
