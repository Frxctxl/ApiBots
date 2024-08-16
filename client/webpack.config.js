const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'deploy_code'),
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", 'sass-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'deploy_code'),
    },
    compress: true,
    hot: true,
    port: 8080,
    proxy: [
      {
        context: '/api',
        target: 'http://localhost:3001',
        secure: false,
      }
    ],
    watchFiles: ['./template.html'],
  },
};
