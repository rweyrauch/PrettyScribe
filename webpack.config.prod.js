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
            }
        ]
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin(),
    ],
    output: {
        filename: 'prettyscribe.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    }
};
