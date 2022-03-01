const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.base');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.resolve(PROJECT_ROOT, 'public');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(TEMPLATE_PATH, 'index.html'),
      minify: true,
    }),
    new CopyPlugin({
      patterns: [
        { context: path.resolve(PROJECT_ROOT, 'public/fonts'), from: '*.woff2', to: 'fonts' },
      ],
    }),
  ],
});
