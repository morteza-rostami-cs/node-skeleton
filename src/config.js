function loadConfig() {
  const nodeEnv = process.env.NODE_ENV || "dev";
  const port = process.env.PORT || 3001;
  const apiPrefix = process.env.API_PREFIX || "/api1";
  const apiBaseUrl = process.env.API_BASE_URL || "";
  const dbPath = process.env.DB_PATH || "";

  return {
    nodeEnv,
    port,
    apiPrefix,
    apiBaseUrl,
    dbPath,
  };
}

const config = loadConfig();
export default config;
