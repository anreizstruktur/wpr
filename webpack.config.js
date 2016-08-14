const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require ('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};


const common = {
  entry: {
    app: PATHS.app
  },

//add resovle.extensions.
//'''is needed to allow imports withouth an extension.
// note the .'s before the extension as it will fail to match without.
resolve: {
  extensions: ['', '.js', '.jsx']
},
output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
module: {
  loaders: [
    {
      test: /\.css$/,
      loaders:['style', 'css'],
      include: PATHS.app
},
{
  test: /\.jsx&/,
  //Enable caching for imporved perofmance during development
  //It uses default OS diretory by devaualt. If you need something more custom, pass a path to it, I.E., babel?cacheDirectory=<path>
  loaders:['babel?bacheDirecory'],
  inclued: PATHS.app
}
]
}
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source_map',
    devServer: {
      contentBase: PATHS.build,

      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });
};

if(TARGET === 'build') {
  module.exports = merge(common, {});
}
