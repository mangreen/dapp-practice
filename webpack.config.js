var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: [
			'babel-polyfill',
			'./app/main.js'
		]
	},
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/',
		filename: 'dist/js/[name].[hash].js',
		chunkFilename: 'dist/js/[id].chunk.[chunkhash:8].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loaders: 'babel-loader',
			query: { compact: false }
			//exclude: /node_modules/,
			//include: [ /node_modules\/flv\.js/ ]
		}, {
			test: /\.vue$/,
			loader: "vue-loader",
			options: {
				loaders: {
					css: "vue-style-loader!css-loader?sourceMap",
					less: "vue-style-loader!css-loader?sourceMap!less-loader?sourceMap",
					postcss: "vue-style-loader!css-loader?sourceMap",
					sass: "vue-style-loader!css-loader?sourceMap!sass-loader?indentedSyntax&sourceMap",
					scss: "vue-style-loader!css-loader?sourceMap!sass-loader?sourceMap",
					styl: "vue-style-loader!css-loader?sourceMap!stylus-loader?sourceMap",
					stylus: "vue-style-loader!css-loader?sourceMap!stylus-loader?sourceMap",
				}
			}
		}, {
			test: /\.(css|scss)$/,
			use: ExtractTextPlugin.extract({
				fallback: 'vue-style-loader',
				use: [{
					loader: "css-loader"
				}, {
					loader: "postcss-loader",
					options: {
						plugins: (loader) => [
						  require('autoprefixer'),
						]
					  }
				}, {
					loader: "sass-loader"
				}]
			})
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			query: {
			  limit: 10000,
			  name: 'dist/img/[name].[hash:7].[ext]'
			}
		}, { 
			test: /\.(woff|woff2|eot|ttf|otf)(\?.*$|$)/,  
			loader: 'url-loader?importLoaders=1&limit=1000&name=dist/fonts/[name].[hash:7].[ext]' 
		},]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		//new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new CleanWebpackPlugin(['public/dist']),
		new webpack.LoaderOptionsPlugin({
			vue: {
				loaders: { 
					css: "vue-style-loader!css-loader?sourceMap",
					less: "vue-style-loader!css-loader?sourceMap!less-loader?sourceMap",
					postcss: "vue-style-loader!css-loader?sourceMap",
					sass: "vue-style-loader!css-loader?sourceMap!sass-loader?indentedSyntax&sourceMap",
					scss: "vue-style-loader!css-loader?sourceMap!sass-loader?sourceMap",
					styl: "vue-style-loader!css-loader?sourceMap!stylus-loader?sourceMap",
					stylus: "vue-style-loader!css-loader?sourceMap!stylus-loader?sourceMap",
				},
				postcss: [
					require('autoprefixer')({
						browsers: ['last 2 versions']
					})
				]
			}
		}),
		new ExtractTextPlugin({
			filename: 'dist/css/index.[contenthash:8].css'
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: { // 排除不想要压缩的对象名称
				except: ['$', 'exports', 'require', 'module']
			},
			compress: {
				// http://lisperator.net/uglifyjs/compress
				warnings: false,    // warn about potentially dangerous optimizations/code
				conditionals: true, // optimize if-s and conditional expressions
				unused: true,       // drop unused variables/functions
				comparisons: true,  // optimize comparisons
				sequences: true,    // join consecutive statements with the "comma operato"
				dead_code: true,    // discard unreachable code 丢弃未使用的代码
				evaluate: true,     // evaluate constant expressions
				join_vars: true,    // join var declarations
				if_return: true     // optimize if-s followed by return/continue
			},
			output: {
				// https://github.com/mishoo/UglifyJS2/blob/master/lib/output.js
				comments: false
			},
			sourceMap: false         //将错误信息的位置映射到模块。这会减慢编译的速度。仅在开发环境下使用。
		}),
		new HtmlWebpackPlugin({
			chunks: ['app', 'manifest'],
			filename: 'index.html',
			template: './views/index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),
		// split vendor js into its own file
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf( path.join(__dirname, '../node_modules') ) === 0
				)
			}
		}),
		// extract webpack runtime and module manifest to its own file in order to
		// prevent vendor hash from being updated whenever app bundle is updated
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		})
	],
	resolve: {
		extensions: ['.js', '.vue', '.scss', '.css', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve('./app')
		},
		modules: ['node_modules']
	}
}