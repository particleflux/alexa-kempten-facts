'use strict';

const path = require('path');
const pkg = require('./package.json');

module.exports = {
    entry: path.resolve(__dirname, pkg.main),
    output: {
        path: path.join(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
        filename: pkg.main
    },
    target: 'node',
    externals: ['aws-sdk'],
    module: {
        /**
         * Tell webpack how to load JSON files.
         * When webpack encounters a 'require()' statement
         * where a JSON file is being imported, it will use
         * the json-loader
         */
        loaders: [
            {
                test:/\.js$/,
                loader:'babel-loader'
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    }
};
