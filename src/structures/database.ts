import { dataDefaults, encryptionDefaults, logDefaults } from "../options/db";
import {
  readDB,
  dbFileExists,
  createDB,
  validateSettings,
} from "../utils/databaseFunctions";
import { locale } from "../data/locales";
import { dbConsole } from "../utils/databaseConsole";
import { fileExists } from "../utils/fileManager";
import { EventEmitter } from "events";
import { emitEvent } from "../utils/eventsHandler";

/**
 * Default database constructor, this will allow you to initialize the database by using the init() function
 * @class
 * @constructor
 * @param {Object} options
 * @param {string} [path=./database/main.betadb] - The path to the database base file (default is "./database/main.betadb") [file extension must be .betadb]
 * @param {boolean} [prettier=false] - Whether to format the database file into a readable file (only works if encryption is disabled)
 * @param {number} [interval=0] - The rate (in miliseconds) at which the database file gets updated (the cache remains live); recommended value is atleast 1000ms (1 second), if this value is set to below 500ms then the database will be written over every time a change occurs
 * @param {Object} encryption
 * @param {boolean} [encryption.encryptionEnabled=false] - Whether to enable database encryption or not (default is false)
 * @param {string} [encryption.secretKey="beta-was-here"] - The secret key which the encryption method uses to keep your password safe (default is "beta-was-here")
 * @param {Object} logging
 * @param {boolean} [logging.logsEnabled=true] - Whether to enable console messages when anything happens
 * @param {boolean} [logging.detailedErrors=true] - Whether to include all thrown information (if there is anything extra) when you get an error. (Keep in mind, if this option is enabled, your app will close down on errors, so disable this on production)
 * @returns {EasyDB}
 *
 * @example
 * const db = new EasyDB(
 *   {
 *     path: "./database/main.betadb",
 *     prettier: true,
 *     interval: 1000,
 *   },
 *   {
 *     encryptionEnabled: false,
 *     secretKey: "beta-was-here",
 *   },
 *   {
 *     logsEnabled: true,
 *     detailedErrors: true,
 *   }
 * );
 *
 * db.init();
 */

class EasyDB extends EventEmitter {
  // CLASS PROPERTIES
  public readonly _options: {
    path: string;
    prettier: boolean;
    interval: number;
  };
  public readonly _encryption: {
    encryptionEnabled: boolean;
    secretKey: string;
  };
  public readonly _logging: { logsEnabled: boolean; detailedErrors: boolean };
  private _ready: boolean = false;
  private _cache: object = {};
  private _updateInterval!: NodeJS.Timeout;

  // CONSTRUCTOR
  constructor(
    private readonly options: {
      path?: string;
      prettier?: boolean;
      interval?: number;
    } = {},
    private readonly encryption: {
      encryptionEnabled?: boolean;
      secretKey?: string;
    } = {},
    private readonly logging: {
      logsEnabled?: boolean;
      detailedErrors?: boolean;
    } = {}
  ) {
    super();
    // DATABASE OPTIONS
    this._options = {
      path: options.path ?? dataDefaults.path,
      prettier: options.prettier ?? dataDefaults.prettier,
      interval: options.interval ?? dataDefaults.interval,
    };

    // ENCRYPTION OPTIONS
    this._encryption = {
      encryptionEnabled:
        encryption.encryptionEnabled ?? encryptionDefaults.encryptionEnabled,
      secretKey: encryption.secretKey ?? encryptionDefaults.secretKey,
    };

    // LOGGING OPTIONS
    this._logging = {
      logsEnabled: logging.logsEnabled ?? logDefaults.logsEnabled,
      detailedErrors: logging.detailedErrors ?? logDefaults.detailedErrors,
    };

    // VALIDATE SETTINGS
    validateSettings(this);
  }

  // INITIALIZATION FUNCTION
  /**
   * Will load the database, and in-case of any problems with the database, you'll receive a warning
   *
   * @public
   */
  public init(): void {
    // SHORT LOOP UNTIL DATABASE LOADED (IF IT FAILS IT WILL RETRY, MAXIMUM 5 ATTEMPTS)

    const tryLoadDatabase = (): void => {
      for (
        let attempts: number = 1;
        this._ready === false && attempts <= 5;
        attempts++
      ) {
        dbConsole.info(this, locale.info.attemptingToLoad, {
          attemptNumber: attempts,
        });
        if (dbFileExists(this) === true) {
          this._cache = readDB(this);
          this._ready = true;

          dbConsole.success(this, locale.success.loadedSuccessfuly);

          emitEvent(this, "databaseReady");
          return;
        }
        dbConsole.warning(this, locale.warning.databaseNotFound, {
          pathToDB: this._options.path,
        });

        // CREATE DATABASE AND THEN RUN LOOP ONE MORE TIME
        emitEvent(this, "databaseCreated");
        createDB(this);
      }
    };

    const setupInterval = (): void => {
      if (this._options.interval > 500)
        this._updateInterval = setInterval(() => {
          // TODO: Make it update the database using the cache

          emitEvent(this, "databaseUpdatedInterval");
        }, this._options.interval);
    };

    tryLoadDatabase();
    setupInterval();
    // IF THIS ERROR SHOWS UP I GENUINELY HAVE NO IDEA WHAT'S WRONG OR HOW TO FIX IT CUZ IT'S OUTSIDE OF ANY FUNCTIONS
    return dbConsole.error(this, locale.errors.failedToLoadUnknown);
  }

  // TODO: Make it so that if the database interval is below 500, it will save data every time it's updated

  // TODO: Events in all functions
  // TODO: Make all functions throw errors if the database hasn't been initialized yet

  // TODO: Create all(options: { format: "object" || "string" }) => any function
  // - Will return the entire database, either as a formatted string, or as an object
  // - Default option is "object"

  // TODO: Create get(key) => any function
  // - Get the value of a key from within the database

  // TODO: Create set(key, value) => void function
  // - Errors when values aren't present, however make the "value" field optional, if nothing present, make it a "null" value

  // TODO: Create has(key) => boolean
  // - Checks whether key exists or not in the database

  // TODO: Create delete(key) => void
  // - Deletes a key from the database

  // TODO: Create add(key, value) => void
  // TODO: Create remove(key, value) => void
  // - Basically += and -= operators

  // TODO: Create push(key, value) => void
  // TODO: Create unpush(key, value) => void
  // - Add/Remove items from an array inside the database

  // TODO: Create startsWith(key, sort) => array
  // - Find all items that start with that key and return them as an array

  // TODO: private _saveDatabase() and private _getDatabase() functions
}

export { EasyDB };
