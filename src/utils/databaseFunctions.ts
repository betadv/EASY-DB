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
// TODO: For me in 12 years, I should probably somehow remove the hardcoded error here with the ".betadb" requirement, but im too lazy right now so this is what u get future me
const validateSettings = (_this: EasyDB): void => {
  let errorList: {
    propertyType?: string;
    propertyKey?: string;
    wrongType?: string;
    correctType?: string;
    specialError?: {
      enabled: boolean;
      message: string;
    };
  }[] = [];

  // CHECK ALL OPTIONS
  optionChecks();

  // if (!_this._options.path.endsWith(".betadb"))
  if (errorList.length > 1) {
    // RETURN ERRORS
    let incorrectProperties: string[] = [];

    for (let property: number = 0; property < errorList.length; property++) {
      if (errorList[property].specialError?.enabled === true) {
        incorrectProperties.push(
          `+ ${errorList[property].specialError?.message}`
        );
      } else
        incorrectProperties.push(
          `- ${errorList[property].propertyType}.${errorList[property].propertyKey}; given value is of type \`${errorList[property].wrongType}\` whilst the correct type is \`${errorList[property].correctType}\``
        );
    }
    return dbConsole.error(
      _this,
      locale.errors.settings.invalidItemType.multipleItems,
      {
        incorrectProperties: incorrectProperties.join("\n"),
        currentPath: _this._options.path,
      },
      "",
      true
    );
  }
  if (errorList.length === 1) {
    if (errorList[0].specialError?.enabled !== false) {
      return dbConsole.error(
        _this,
        `ERROR: ${errorList[0].specialError?.message}`,
        { currentPath: _this._options.path },
        "",
        true
      );
    }
    return dbConsole.error(
      _this,
      locale.errors.settings.invalidItemType.singleItem,
      errorList[0],
      "",
      true
    );
  }

  function optionChecks() {
    if (typeof _this._options.path === "string") {
      if (!_this._options.path.endsWith(".betadb"))
        errorList.push({
          specialError: {
            enabled: true,
            message: locale.errors.settings.invalidDatabasePathType,
          },
        });
    }
    let givenType: string;
    givenType = typeof _this._options.path;
    if (givenType !== "string") {
      errorList.push({
        propertyType: "options",
        propertyKey: "path",
        wrongType: givenType,
        correctType: "string",
      });
    }
    givenType = typeof _this._options.prettier;
    if (givenType !== "boolean") {
      errorList.push({
        propertyType: "options",
        propertyKey: "prettier",
        wrongType: givenType,
        correctType: "boolean",
      });
    }
    givenType = typeof _this._options.interval;
    if (givenType !== "number") {
      errorList.push({
        propertyType: "options",
        propertyKey: "interval",
        wrongType: givenType,
        correctType: "number",
      });
    }
    givenType = typeof _this._encryption.encryptionEnabled;
    if (givenType !== "boolean") {
      errorList.push({
        propertyType: "encryption",
        propertyKey: "encryptionEnabled",
        wrongType: givenType,
        correctType: "boolean",
      });
    }
    givenType = typeof _this._encryption.secretKey;
    if (givenType !== "string") {
      errorList.push({
        propertyType: "encryption",
        propertyKey: "secretKey",
        wrongType: givenType,
        correctType: "string",
      });
    }
    givenType = typeof _this._logging.logsEnabled;
    if (givenType !== "boolean") {
      errorList.push({
        propertyType: "logging",
        propertyKey: "logsEnabled",
        wrongType: givenType,
        correctType: "boolean",
      });
    }
    givenType = typeof _this._logging.detailedErrors;
    if (givenType !== "boolean") {
      errorList.push({
        propertyType: "logging",
        propertyKey: "detailedErrors",
        wrongType: givenType,
        correctType: "boolean",
      });
    }
  }
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
