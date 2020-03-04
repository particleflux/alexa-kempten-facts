'use strict';

const path = require('path');
const pkg = require('./package.json');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, pkg.main),
    output: {
        path: path.join(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
        filename: pkg.main
    },
    target: 'node',
    externals: ['aws-sdk'],
    module: {
        rules: [
            {
                test:/\.js$/,
                loader:'babel-loader'
            }
        ]
    }
};
