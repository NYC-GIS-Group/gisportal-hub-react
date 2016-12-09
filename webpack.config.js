var webpack = require('webpack'),
    BrowserSync = require('browser-sync-webpack-plugin');
require('babel-polyfill');

module.exports = {
    entry:[
        'babel-polyfill',
        './app/app.jsx'
    ],
    
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compressor:{
                warnings: false
            }
        }),
        new BrowserSync({
            host:'localhost',
            port:3000,
            server:{
                baseDir: [__dirname]
            }
        })
    ],
    output: {
        path: __dirname + '/public',
        filename: './bundle.js'
    },
    resolve:{
        root: __dirname,
        modulesDirectories:[
            'node_modules',
            './app/components'
        ],
        extensions:['','.js', '.jsx']
    },
    module:{
        loaders:[
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules)/
            }
        ]
    }
    

}