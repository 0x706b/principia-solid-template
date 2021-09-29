import type { Configuration } from 'webpack'

import EslintWebpackPlugin from 'eslint-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import nodeExternals from 'webpack-node-externals'

const isProd         = process.env.ENV === 'prod'
process.env.NODE_ENV = isProd ? 'production' : 'development'

const server: Configuration = {
  mode: isProd ? 'production' : 'development',
  context: __dirname,
  entry: './src/server',
  target: 'node',
  externalsPresets: { node: true },
  // @ts-expect-error
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['solid', { generate: 'ssr', hydratable: true }],
              ],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    conditionNames: ['node'],
  },
}

const config: Configuration & { devServer?: {} } = {
  mode: isProd ? 'production' : 'development',
  context: __dirname,
  entry: './src/client',
  ...(isProd ? {} : { devtool: 'inline-source-map' }),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['solid', { generate: 'dom', hydratable: true }],
              ],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/public/js'),
    filename: 'client.js',
  },
  plugins: [
    new EslintWebpackPlugin({
      extensions: ['ts', 'tsx'],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    client: {
      overlay: false,
    },
    hot: true,
    compress: true,
    port: 4000,
  },
}

export default [config, server]
