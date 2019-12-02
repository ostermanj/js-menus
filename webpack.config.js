const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const outputFolder = 'docs/';


const scssUse = !isProd ? [
    /**
     * MiniCssExtractPlugin doesn't support HMR.
     * For developing, use 'style-loader' instead.
     * */
    'style-loader',
    'css-loader',
    'sass-loader'
] : [{
        loader: MiniCssExtractPlugin.loader,
    },
    {
        loader: 'css-loader',
        options: {
           
            sourceMap: true,
            importLoaders: 1
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            ident: 'postcss',
            plugins: (loader) => [
                require('postcss-preset-env')({
                    autoprefixer: {
                        grid: true
                    }
                }),
            ]
        }
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true
        }
    },
];


module.exports = env => {
    return {
        entry: {
            index: './src/index.js'
        },
        output: {
            path: __dirname + '/' + outputFolder,
            filename: '[name].js',
            chunkFilename: '[name].[id].js'
        },
        module: {
            rules: [{
                        test: /\.js$/,
                        exclude: [/node_modules/, /\.min\./, /vendor/],
                        use: [
                            {
                                loader: 'eslint-loader'
                            }
                        ]},
                {
                    test: /\.css$/,
                    use: [
                        /**
                         * MiniCssExtractPlugin doesn't support HMR.
                         * For developing, use 'style-loader' instead.
                         * */
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                    ]
                },
                {
                    test: /\.scss$/,
                    use: scssUse
                },
            ]
        },
        mode,
        plugins: [
		    new CleanWebpackPlugin(),
		    new HtmlWebpackPlugin({
		        title: 'Threespot js test',
		        template: './src/index.html',
		    }),
		    new MiniCssExtractPlugin({
		        filename: 'styles.css'
		    }),
		],
        devtool: !isProd ? 'source-map' : false // TO DO: WILL WANT SOURCE MAPS
    }
};