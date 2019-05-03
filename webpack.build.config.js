const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/Lightbox.js',
	output: {
		path: path.resolve(__dirname, './lib'),
		// publicPath: '/app/assets/',
		// publicPath: '',
		filename: 'Lightbox.js',
		chunkFilename: 'Lightbox.chunk.js',
		library: 'Lightbox',
		libraryTarget: 'umd',
		// globalObject: '(typeof self !== "undefined" ? self : this)',
	},
	externals: {
		'react': 'react',
		'react-dom': 'react-dom',
		// 'react-player': 'react-player',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'base64-inline-loader?name=[path][name].[ext]',
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
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'Lightbox.css',
		}),
	],
	optimization: {
		minimize: true,
	},
	stats: {
		assets: false,
		children: false,
		context: path.resolve(__dirname),
	},
};
