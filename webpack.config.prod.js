const path = require('path');

module.exports = {
    entry: './src/app.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'prettyscribe.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js'
        ]
    }
};
