const dataDefaults: { path: string; prettier: boolean; interval: number } = {
  path: "./database/main.betadb",
  prettier: false,
  interval: 0,
};
const encryptionDefaults: { encryptionEnabled: boolean; secretKey: string } = {
  encryptionEnabled: true,
  secretKey: "beta-was-here",
};
const logDefaults: { logsEnabled: boolean; detailedErrors: boolean } = {
  logsEnabled: true,
  detailedErrors: true,
};

export { dataDefaults, encryptionDefaults, logDefaults };
