module.exports = {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      
    ],
    node: {
      process: false,
    }
    
  }
  