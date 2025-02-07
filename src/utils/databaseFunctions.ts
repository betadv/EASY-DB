import { locale } from "../data/locales";
import { encrypt, decrypt } from "../encryption/databaseEncrypt";
import { EasyDB } from "../structures/database";
import { dbConsole } from "./databaseConsole";
import { createFile, fileExists, readFile, writeFile } from "./fileManager";
import { dataDefaults, encryptionDefaults, logDefaults } from "../options/db";

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

  if (_this._encryption.encryptionEnabled === false) {
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
  let optionsToCheck: object[] = [
    {
      propertyType: "options",
      propertyKey: "path",
      correctType: typeof dataDefaults.path,
    },
    {
      propertyType: "options",
      propertyKey: "prettier",
      correctType: typeof dataDefaults.prettier,
    },
    {
      propertyType: "options",
      propertyKey: "interval",
      correctType: typeof dataDefaults.interval,
    },
  ];

  // TODO: Add rest of checks
  let errorList: {
    propertyType: string;
    propertyKey: string;
    wrongType: string;
    correctType: string;
  }[] = [];

  for (let i: number = 0; i < optionsToCheck.length; i++) {}

  // RETURN ERRORS
  if (errorList.length > 1) {
    let incorrectProperties: string[] = [];

    for (
      let property: number = 0;
      property + 1 < errorList.length;
      property++
    ) {
      incorrectProperties.push(
        `- ${errorList[property].propertyType}.${errorList[property].propertyKey}; given type is \`${errorList[property].wrongType}\`, correct type is \`${errorList[property].correctType}\``
      );
    }

    return dbConsole.error(
      _this,
      locale.errors.settings.invalidItemType.multipleItems,
      { incorrectProperties: incorrectProperties.join("\n") },
      "",
      true
    );
  }
  if (errorList.length === 1)
    dbConsole.error(
      _this,
      locale.errors.settings.invalidItemType.singleItem,
      errorList[0],
      "",
      true
    );

  // LAST FINAL CHECK FOR DATABASE FILETYPE
  if (!_this._options.path.endsWith(".betadb"))
    return dbConsole.error(_this, locale.errors.settings.invalidFileType);

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

  if (_this._encryption.encryptionEnabled === true)
    defaultContent = encrypt(_this, {});
  else defaultContent = "{}";

  return createFile(_this._options.path, defaultContent);
};

/**
 * Updates the database file with the provided content
 * @param {EasyDB} _this - Database Class
 * @param {object} content - The object that needs to be written to the database
 * @returns {void}
 */

// - We will check settings here aswell
// ???? I LITERALLY DON'T REMEMBER WHAT THIS MEANS
const writeDB = (_this: EasyDB, content: object): void => {
  let contentToWrite: string;
  if (_this._encryption.encryptionEnabled === true)
    contentToWrite = encrypt(_this, content);
  else contentToWrite = JSON.stringify(content);

  return writeFile(_this._options.path, contentToWrite);
};

export { readDB, dbFileExists, createDB, writeDB, validateSettings };
