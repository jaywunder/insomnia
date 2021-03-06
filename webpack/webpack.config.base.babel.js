const path = require('path');
const pkg = require('../app/package.json');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, '../app'),
  entry: [
    './renderer.js',
    './renderer.html'
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['babel-loader'],
        exclude: [/node_modules/, /__fixtures__/, /__tests__/]
      },
      {
        // To make
        test: /\.(js|flow)$/,
        use: ['babel-loader'],
        include: [/node_modules\/graphql-language-service-interface/]
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          {loader: 'less-loader', options: {noIeCompat: true}}
        ]
      },
      {
        test: /\.(html|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(png)$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  externals: [
    // Omit all dependencies in app/package.json (we want them loaded at runtime via NodeJS)
    ...Object.keys(pkg.dependencies),

    // To get jsonlint working...
    'file', 'system'
  ],
  plugins: [],
  target: 'electron-renderer'
};
