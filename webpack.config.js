'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'cheap-module-source-map',
	quiet: false,
	entry: {
		game: __dirname + "/webpack/game.js",
	},
	output: {
		filename: "[name].js",
		path: __dirname + "/views/static/"
	},
	module: {	
		loaders: [
			{
				test: /\.jsx?$/,
				loader: "babel",
				exclude: /node_modules/,
				query: {
					"presets": ["react", "es2015"]
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {warnings: false},
			output: {comments: false}
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			'window.jQuery': 'jquery',
			React: "react",
			ReactDOM: "react-dom"
		})
	]
};
