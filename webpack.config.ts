import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import packageJson from './package.json';

const NODE_ENV = (process.env.NODE_ENV ||
  'development') as webpack.Configuration['mode'];

const isDevelopment = NODE_ENV === 'development';

const { dir, ...options } = isDevelopment
  ? { dir: 'dev', devtool: 'cheap-module-source-map' }
  : { dir: 'prod' };

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

const config: webpack.Configuration = {
  mode: NODE_ENV,
  entry: {
    background: './src/background/index.ts',
    content: './src/content/index.ts',
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
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'manifest.json',
          to: '.',
          transform: function (content) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: packageJson.description,
                version: packageJson.version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
        { from: 'src/assets', to: 'assets' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  ...options,
};

export default config;
