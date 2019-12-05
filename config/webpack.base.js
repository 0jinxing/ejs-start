const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV !== "production";

const webpackConfig = {
  output: {
    filename: "[name].[hash:5].js",
    chunkFilename: "[id].[hash:5].js"
  },

  module: {
    rules: [
      {
        test: /.js?$/i,
        use: [{ loader: "babel-loader", options: { compact: false } }]
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { modules: true } },
          {
            loader: "sass-loader",
            options: { implementation: require("sass") }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 4096
          }
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
      }
    ]
  },

  plugins: [
    ...(process.env.BUNDLE_ANALYSIS ? [new BundleAnalyzerPlugin()] : []),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new CopyPlugin([
      { from: path.resolve("public"), ignore: ["template.html"] }
    ])
  ],

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        common: { name: "common", chunks: "all", priority: 1 },
        vendor: {
          chunks: "all",
          test: /node_modules/,
          priority: 2,
          name: mod => {
            const pathArr = mod.context.split(path.sep);
            const nameInd = pathArr.findIndex(p => p === "node_modules") + 1;
            return pathArr[nameInd];
          }
        }
      }
    }
  }
};

if (isDev) {
  delete webpackConfig.optimization;
}

module.exports = webpackConfig;
