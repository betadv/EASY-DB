const dataDefaults: { path: string; prettier: boolean } = {
  path: "./database/main.betadb",
  prettier: false,
};
const encryptionDefaults: { enabled: boolean; secretKey: string } = {
  enabled: true,
  secretKey: "beta-was-here",
};
const logDefaults: { enabled: boolean; detailedErrors: boolean } = {
  enabled: true,
  detailedErrors: true,
};

export { dataDefaults, encryptionDefaults, logDefaults };
