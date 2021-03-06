const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	context: path.resolve(__dirname, 'examples/src'),
	entry: {
		app: './app.js',
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'examples/src'),
		host: '0.0.0.0',
		port: 8000,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: { presets: ['react', 'env'] },
				}],
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					'less-loader',
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[local]--[hash:base64:5]',
						},
					},
				],
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
				}],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader?name=[path][name].[ext]',
			},
		],
	},
	resolve: {
		alias: {
			'react-images': path.resolve(__dirname, 'src/Lightbox'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: false,
			template: path.resolve(__dirname, 'examples/src/index.html'),
		}),
		new MiniCssExtractPlugin({
			filename: 'example.css',
		}),
	],
	stats: {
		assets: false,
		children: false,
		context: path.resolve(__dirname),
	},
};
