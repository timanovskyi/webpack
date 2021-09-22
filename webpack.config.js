const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizerWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log(isDev)

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const babelOptions = (extra) => {
    const opt = {
        presets: [
            '@babel/preset-env',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (extra) {
        opt.presets.push(extra)
    }
    return opt
}

const cssLoaders = (extra) => {
    const loaders =
        [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {},
            },
            'css-loader'
        ]

    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

function jsLoader() {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions()
        }
    ]
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
}

function plugins() {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin(
        //     [
        // {
        //     from: path.resolve(__dirname, 'src/favicon.ico'),
        //     to: path.resolve(__dirname, 'dist'),
        // }
        //     ]
        // ),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        })
    ];

    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }

    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: [
            '@babel/polyfill',
            './index.jsx'
        ],
        analytics: './analytics.ts'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.png'
        ],
        alias: {
            "@models": path.resolve(__dirname, 'src/models'),
            "@": path.resolve(__dirname, 'src'),
        }
    },
    devtool: isDev ? 'eval-source-map' : false,
    optimization: optimization(),
    plugins: plugins(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '/public/icons/[name].[ext]'
                }
            },
            {
                test: /\.(ttf|woff)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: jsLoader(),
            },
            {
                test: /\.ts$/,
                exclude: /node-modules/,
                loader: 'babel-loader',
                options: babelOptions('@babel/preset-typescript')
            },
            {
                test: /\.jsx$/,
                exclude: /node-modules/,
                loader: 'babel-loader',
                options: babelOptions('@babel/preset-react')
            },

        ]
    }
}
