function loadConfig() {
  const nodeEnv = process.env.NODE_ENV || "dev";
  const port = process.env.PORT || 3001;
  const apiPrefix = process.env.API_PREFIX || "/api1";

  return {
    nodeEnv,
    port,
    apiPrefix,
  };
}

const config = loadConfig();
export default config;
