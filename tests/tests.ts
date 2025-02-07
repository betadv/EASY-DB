import { EasyDB } from "../index";

const db = new EasyDB(
  {
    path: 123123123,
    prettier: "true",
  },
  {
    secretKey: "beta-was-here",
  },

  {
    logsEnabled: true,
  }
);

// TEST INITIALIZATION
db.init();
