const path = require('path');

module.exports = {
  context: __dirname,
  entry: './js/App.jsx',
  output: {
    path: path.join(__dirname, '/assets'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8090/assets'
  },
  module: {
    loaders: [
      { test: /\.js.?$/, loader: 'babel-loader' },
      { test: /\.(scss|sass)$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.css$/, loaders: ['style', 'css'] }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  }
}
