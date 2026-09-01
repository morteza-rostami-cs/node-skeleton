function loadConfig() {
  const nodeEnv = process.env.NODE_ENV || "dev";
  const port = process.env.PORT || 3001;

  return {
    nodeEnv,
    port,
  };
}

const config = loadConfig();
export default config;
