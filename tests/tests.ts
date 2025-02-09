import { EasyDB } from "../index";

const db = new EasyDB(
  {
    path: "./database/main.json",
    prettier: true,
    interval: 1000,
  },
  {
    encryptionEnabled: true,
    secretKey: "beta-was-here",
  },
  {
    logsEnabled: true,
    detailedErrors: true,
  }
);

// TEST INITIALIZATION
db.init();
