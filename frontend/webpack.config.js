// const path = require("path");
import path from "path";

module.exports = {
  entry: "./src/index.js", // Replace with the path to your app's entry point
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
