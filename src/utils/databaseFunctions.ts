import { locale } from "../data/locales";
import { encrypt, decrypt } from "../encryption/databaseEncrypt";
import { dbConsole } from "./databaseConsole";
import { createFile, fileExists, readFile, writeFile } from "./fileManager";

/**
 * Reads the database file and returns the data (doesn't affect encryption)
 * @param {*} _this
 * @returns {object}
 */

const dbFileExists = (_this: any): boolean => {
  return fileExists(_this._options.path);
};

const readDB = (_this: any): object => {
  const fileContent = readFile(_this._options.path);


  if (_this._encryption.enabled === false) {
    try {
      return JSON.parse(fileContent);
    } catch (err) {
      throw dbConsole.error(_this, locale.errors.unableToRead, err);
    }
  }

  let decryptedContent: any = decrypt(fileContent, _this._encryption.secretKey);

  return JSON.parse(decryptedContent);
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
