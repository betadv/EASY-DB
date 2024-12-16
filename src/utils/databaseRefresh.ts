import fs from "fs";

// IGNORE
const useLive = (options: any) => {
  setInterval(function () {
    let databaseInformation = JSON.parse(
      fs.readFileSync(options.path, { encoding: "utf-8" })
    );
  }, 1000);
};
