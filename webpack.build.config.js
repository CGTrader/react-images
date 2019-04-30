const path = require('path');

module.exports = {
	entry: './src/Lightbox.js',
	output: {
		path: path.resolve(__dirname, './lib'),
		publicPath: '/',
		filename: 'Lightbox.js',
		library: 'Lightbox',
		libraryTarget: 'umd',
		globalObject: '(typeof self !== "undefined" ? self : this)',
	},
	externals: {
		'react': 'react',
		'react-dom': 'react-dom',
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
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'base64-inline-loader?name=[path][name].[ext]',
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							// singleton: true,
							transform: 'conditional.css.js',
						},
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
	plugins: [],
	optimization: {
		minimize: true,
	},
};
