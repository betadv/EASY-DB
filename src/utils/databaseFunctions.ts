import { locale } from "../data/locales";
import { encrypt, decrypt } from "../encryption/databaseEncrypt";
import { EasyDB } from "../structures/database";
import { dbConsole } from "./databaseConsole";
import { createFile, fileExists, readFile, writeFile } from "./fileManager";

/**
 * Checks if the database file exists
 *
 * @param {EasyDB} _this - Database Class
 * @returns {boolean}
 */
const dbFileExists = (_this: EasyDB): boolean => {
  return fileExists(_this._options.path);
};

/**
 * Reads the database file and returns the data (this doesn't affect encryption)
 * @param {EasyDB} _this - Database Class
 * @returns {object}
 */
const readDB = (_this: EasyDB): object => {
  const fileContent = readFile(_this._options.path);

  if (_this._encryption.enabled === false) {
    try {
      return JSON.parse(fileContent);
    } catch (err) {
      throw dbConsole.error(_this, locale.errors.unableToRead, {}, err);
    }
  }

  let decryptedContent: string = decrypt(_this, fileContent);

  try {
    return JSON.parse(decryptedContent);
  } catch (err) {
    throw dbConsole.error(_this, locale.errors.unableToRead, {}, err);
  }
};

/**
 * Checks and verifies if the database settings are valid and can proceed with the database initialization
 *
 * @param {EasyDB} _this - Database Class
 * @returns {void}
 */

// TODO: Create validate settings function
const validateSettings = (_this: EasyDB): void => {
  // check file path ends with .betadb
  // check properties themselves to see if they're correct types
};

/**
 * Creates the database file & writes some default content (depending on your settings; the default data will slightly differ for everyone)
 * @param {EasyDB} _this - Database Class
 * @returns {object}
 */
const createDB = (_this: EasyDB) => {
  let defaultContent: string;

  if (_this._encryption.enabled === true) defaultContent = encrypt(_this, {});
  else defaultContent = "{}";
  createFile(_this._options.path, defaultContent);
};

/**
 * Updates the database file with the provided content
 * @param {EasyDB} _this - Database Class
 * @param {object} content - The object that needs to be written to the database
 * @returns {void}
 */
// TODO: Create writing to database function
// - We will check settings here aswell
const writeDB = (_this: EasyDB, content: object): void => {};

export { readDB, dbFileExists, createDB, writeDB, validateSettings };
