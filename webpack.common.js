const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BabelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except')


module.exports = {
	entry: {
		viewer: path.join(__dirname, 'src', 'viewer.js'),
		files: path.join(__dirname, 'src', 'files.js'),
		document: path.join(__dirname, 'src', 'document.js'),
		admin: path.join(__dirname, 'src', 'admin.js'),
		personal: path.join(__dirname, 'src', 'personal.js'),
	},
	output: {
		path: path.resolve(__dirname, './js'),
		publicPath: '/js/',
		filename: '[name].js',
		chunkFilename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|vue)$/,
				exclude: /node_modules/,
				use: 'eslint-loader',
				enforce: 'pre'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: BabelLoaderExcludeNodeModulesExcept([
					'@nextcloud/dialogs',
					'@nextcloud/event-bus'
				]),
			},
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader'
			}
		]
	},
	plugins: [
		new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue', '.json', '.tsx']
	}
};
