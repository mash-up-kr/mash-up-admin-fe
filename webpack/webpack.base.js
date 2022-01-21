const path = require('path');
const Dotenv = require('dotenv-webpack');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_PATH = path.resolve(PROJECT_ROOT, 'dist');
const SRC_PATH = path.resolve(PROJECT_ROOT, 'src');

module.exports = {
  entry: path.resolve(SRC_PATH, 'index.tsx'),
  output: {
    path: DIST_PATH,
    filename: '[name].js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    preferRelative: true,
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    modules: ['node_modules'],
  },
  plugins: [new Dotenv()],
};
