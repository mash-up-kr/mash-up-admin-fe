const path = require('path');
const Dotenv = require('dotenv-webpack');
const { createEmotionPlugin } = require('emotion-ts-plugin');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_PATH = path.resolve(PROJECT_ROOT, 'dist');
const SRC_PATH = path.resolve(PROJECT_ROOT, 'src');
const TEST_PATH = path.resolve(PROJECT_ROOT, 'test');

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
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                createEmotionPlugin({
                  // <------------------- here
                  sourcemap: true,
                  autoLabel: true,
                  labelFormat: '[local]',
                  // if the jsxFactory is set, should we auto insert the import statement
                  autoInject: true,
                  // set for react@17 new jsx runtime
                  // only effect if `autoInject` is true
                  // set it in createEmotionPlugin options rather than in `tsconfig.json` will generate more optimized codes:
                  // import { jsx } from 'react/jsx-runtime' for files not using emotion
                  // import { jsx } from '@emotion/react/jsx-runtime' for files using emotion
                  jsxImportSource: '@emotion/react',
                }),
              ],
            }),
            compilerOptions: {
              // set jsx pragma to jsx or alias which is from the @emotion/react package to enable css property in jsx component
              jsxFactory: 'jsx',
            },
          },
        },
      },
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
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '@': SRC_PATH,
      '#': TEST_PATH,
    },
    modules: ['node_modules'],
  },
  plugins: [new Dotenv()],
};
