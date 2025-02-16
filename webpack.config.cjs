const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

// const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const { dir, ...options } = isDevelopment
  ? { dir: 'dev', devtool: 'cheap-module-source-map' }
  : {
      dir: 'prod',
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: false,
          }),
        ],
      },
    };

const fileExtensions = [
  'eot',
  'gif',
  'jpeg',
  'jpg',
  'otf',
  'png',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

module.exports = {
  mode: NODE_ENV,
  entry: {
    background: './src/background/index.js',
    content: './src/content/index.js',
    camera: './src/camera/index.jsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `dist/${dir}`),
    clean: true,
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: new RegExp(`\\.(${fileExtensions.join('|')})$`),
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'manifest.json',
          to: '.',
          // transform: function (content) {
          //   // TODO: generates the manifest file using the package.json informations
          //   return Buffer.from(
          //     JSON.stringify({
          //       description: packageJson.description,
          //       version: packageJson.version,
          //       ...JSON.parse(content.toString()),
          //     })
          //   );
          // },
        },
        { from: 'src/assets', to: 'assets' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/camera/index.html',
      filename: 'camera.html',
      chunks: ['camera'],
    }),
  ],
  resolve: {
    extensions: fileExtensions
      .map((extension) => `.${extension}`)
      .concat(['.js', '.jsx', '.css']),
  },
  ...options,
};
