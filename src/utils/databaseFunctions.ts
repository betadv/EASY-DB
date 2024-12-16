import fs from "fs";
import { encrypt, decrypt } from "../encryption/databaseEncrypt";

/**
 * Reads the database file and returns the data (doesn't affect encryption)
 *
 * @param {*} _this
 * @returns {object}
 */
const readFile = (filePath): string => {
  return fs.readFileSync(filePath, { encoding: "utf-8" });
};

const readDB = (_this: any) => {
  console.log(
    encrypt(
      {
        name: "betadv",
        age: 16,
      },
      _this._encryption.secretKey
    )
  );

  const content = readFile(_this._options.path);

  // CHECKS
  if (_this._encryption.enabled === false) return content;

  // RESULT
  const decryptedContent: object = decrypt(
    content,
    _this._encryption.secretKey
  );

  return decryptedContent;
};

export { readDB };
