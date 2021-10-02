const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
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
    plugins: [
        new CleanPlugin.CleanWebpackPlugin(),
    ],
    output: {
        filename: 'prettyscribe.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ],
        fallback: { "stream": false }
    }
};
