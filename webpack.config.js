const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  plugins: [new HtmlWebpackPlugin({
    title: 'Development',
    template: 'index.html',
  })],
  module: {
    rules: [
      // {test: /\.jsx?/,
      {test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    }, 
    {
      test: /\.(s(a|c)ss)$/,
      use: ['style-loader','css-loader', 'sass-loader']
   }
  ]
},
devServer: {
  static:{
    publicPath: 'build',
    directory: path.resolve(__dirname, 'build')
  },
  proxy: {
    '/api': 'http://localhost:3000'
  }
},
resolve: {
  extensions: ['*', '.js', '.jsx']
},
}