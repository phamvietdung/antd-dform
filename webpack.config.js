const path = require('path');

const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');

// const presetPluginTransformReactJsx = require('@babel/preset-plugin-transform-react-jsx');


module.exports = {
    // exclude:path.resolve(__dirname, "node_modules"),
    target: 'node', // in order to ignore built-in modules like path, fs, etc. 
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
    mode: 'none',
    entry: {
        index: path.join(__dirname, 'src', 'index.tsx'),
        interface: path.join(__dirname, 'src', 'interface.tsx')
    },
    target: 'web',
    resolve: {
        // extensions: ['jsx']
        extensions: ['.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                // use: 'ts-loader',
                exclude: [/node_modules/],
                use : [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc : false,
                            presets: [
                                // '@babel/preset-env','@babel/stage-0','@babel/react'
                                // 'es2015-native-modules','stage-0','react'
                                '@babel/preset-typescript'//, '@babel/plugin-transform-react-jsx'//, '@babel/plugin-transform-typescript'
                              ],
                              plugins: ['@babel/plugin-transform-react-jsx'] //'@babel/plugin-transform-typescript', 

                        }
                    }
                ]
            },
            // {
            //     test: /\.jsx?$/,
            //     loader: 'jsx-loader',
            //     exclude: '/node_modules/'
            // }
            {
                test: /\.jsx?$/,
                // loader: "babel-loader",
                exclude: [/node_modules/, /src/],
                use : [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc : false,
                            presets: [
                                // '@babel/preset-env','@babel/stage-0','@babel/react'
                                // 'es2015-native-modules','stage-0','react'
                                '@babel/preset-react'
                              ]
                        }
                    }
                ]
                // query: {
                //     plugins: ["react-hot-loader/babel", 'transform-runtime'],
                //     presets: ['es2015', 'stage-0', 'react']
                // }
            }

        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    // plugins: [
    //     new presetPluginTransformReactJsx()
    // ],
}