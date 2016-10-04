module.exports = {
  entry: './src/app/main.ts',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.scss$/, loader: 'sass-loader' }
    ]
  }
};
