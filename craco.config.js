const path = require("path");

module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /.m?js$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
    },
  },

};
