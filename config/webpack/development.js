const environment = require('./environment')
var path = require('path');
var config = environment.toWebpackConfig();

// config.resolve.modules = [__dirname, 'node_modules'];
config.output.filename = '[name].js';
config.module.rules = [
	{
		test: /\.css$/,
		use: ['style-loader', 'css-loader']
	},
	{
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  }
]
module.exports = config;
