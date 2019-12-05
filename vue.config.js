module.exports = {
  /*publicPath: process.env.NODE_ENV === "production" ? "/stops" : "",*/
  outputDir: "docs",
  pwa: {
    workboxOptions: { skipWaiting: true } /* fix ios cache issue*/
  }
};
