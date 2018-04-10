// import webpack from "wepack";

module.export = {
  webpack: (config, { dev }) => {
    // Perform customizations to webpack config

    // Important: return the modified config
    if (dev) {
      config.devtool = "cheap-eval-source-map";
    }
    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    config.plugins.push();
    return config;
  }
};
