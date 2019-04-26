const path = require('path');

module.exports = {
	mode: 'production',
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
		],
	},
	plugins: [],
	optimization: {
		minimize: true,
	},
};
