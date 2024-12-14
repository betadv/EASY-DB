const dirs = (path) => {
  const fs = require("fs-extra");
  fs.ensureDirSync(path);
}

module.exports = { dirs }