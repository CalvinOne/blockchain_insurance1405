const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const files = fs.readdirSync(path.resolve(__dirname, './app'));
const fileMap = []
files.forEach((e) => {
  if (path.extname(e) === '.html') {
    fileMap.push({
      from: './app/' + e,
      to: e
    })
  }
})

console.log(fileMap)

module.exports = {
  entry: './app/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin(fileMap)
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
