const dataDefaults: { path: string; prettier: boolean; interval: number } = {
  path: "./database/main.betadb",
  prettier: false,
  interval: 1000,
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
