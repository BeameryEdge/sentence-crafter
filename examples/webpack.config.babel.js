import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export default () => ({
    entry: {
        index: path.join(__dirname, './index.tsx'),
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", "jsx", ".css"]
    },

    module: {
        rules: [
            {
                test: /.tsx?$/,
                exclude: /node_modules/,

                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                ['es2015', { modules: false }],
                                'react',
                            ],
                        }
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader',
            },
        ]
    },

    plugins: [
        // Clean dist folder
        new CleanWebpackPlugin(['./dist/build.js']),
    ]
});