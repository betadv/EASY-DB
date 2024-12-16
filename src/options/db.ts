const dataDefaults: { path: string; prettier: boolean; autoLoad: boolean } = {
  path: "./database/main.betadb",
  prettier: false,
  autoLoad: true,
};
const encryptionDefaults: { enabled: boolean; secretKey: string } = {
  enabled: true,
  secretKey: "beta-was-here",
};

export { dataDefaults, encryptionDefaults };
