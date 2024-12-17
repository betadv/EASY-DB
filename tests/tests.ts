import { EasyDB } from "../index";

const db = new EasyDB(
  {
    path: "./database/main.betadb",
    prettier: true,
  },
  {
    enabled: true,
    secretKey: "beta-was-here",
  },
  {
    enabled: true,
    detailedErrors: true,
  }
);

// TEST INITIALIZATION
db.init();
