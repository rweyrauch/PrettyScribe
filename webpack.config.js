const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        filename: 'prettyscribe.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist',
        clean: true,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ],
        fallback: { "stream": false }
    },
    devServer: {
        static: {
            directory: __dirname,
        },
    }
};
