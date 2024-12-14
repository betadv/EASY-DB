const fs = require("fs");

// IGNORE
const useLive = (c) => {
  setInterval(function() {
    let edb = JSON.parse(
      fs.readFileSync(c.options.path, { encoding: 'utf-8' }));
  }, 1000);
}