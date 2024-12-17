import { encrypt, decrypt } from "../encryption/databaseEncrypt";
import { createFile, fileExists, readFile, writeFile } from "./fileManager";

/**
 * Reads the database file and returns the data (doesn't affect encryption)
 * @param {*} _this
 * @returns {object}
 */

const dbFileExists = (_this: any): boolean => {
  return fileExists(_this._options.path);
};

const readDB = (_this: any) => {
  const fileContent = readFile(_this._options.path);
  console.log(fileContent);

  if (_this._encryption.enabled === false) return fileContent;
  let decryptedContent: string = decrypt(
    fileContent,
    _this._encryption.secretKey
  );

  return decryptedContent;
};

const createDB = (_this: any) => {
  let defaultContent: string;
  if (_this._encryption.enabled === true)
    defaultContent = encrypt({}, _this._encryption.secretKey);
  else defaultContent = "{}";
  createFile(_this._options.path, defaultContent);
};

// TODO: Writing to database function
const writeDB = (_this: any, content: any) => {};

export { readDB, dbFileExists, createDB, writeDB };
