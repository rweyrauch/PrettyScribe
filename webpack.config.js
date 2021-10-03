const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        filename: 'prettyscribe.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ],
    },
};
