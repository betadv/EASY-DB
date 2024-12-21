import { EasyDB } from "../index";

const db = new EasyDB(
  {
    prettier: true,
  },
  {
    secretKey: "beta-was-here",
  },
  {
    enabled: true,
  }
);

// TEST INITIALIZATION
db.init();
