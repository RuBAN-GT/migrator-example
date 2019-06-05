const nodeExternals = require('webpack-node-externals')
const path = require('path')
const slsw = require('serverless-webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const root = __dirname

module.exports = {
  entries: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    path: path.join(root, 'dist'),
    filename: '[name].js'
  },
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(root, 'tsconfig.json')
      })
    ]
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        loader: 'ts-loader',
        include: root,
        exclude: /node_modules/
      }
    ]
  }
}
