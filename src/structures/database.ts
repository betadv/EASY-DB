import { dataDefaults, encryptionDefaults, logDefaults } from "../options/db";
import { readDB, dbFileExists, createDB } from "../utils/databaseFunctions";
import { locale } from "../data/locales";
import { dbConsole } from "../utils/databaseConsole";
import { fileExists } from "../utils/fileManager";
import { EventEmitter } from "events";

/**
 * Default database constructor, this will allow you to initialize the database by using the init() function
 * @class
 * @constructor
 * @param {Object} options
 * @param {string} [path=./database/main.betadb] - The path to the database base file (default is "./database/main.betadb") [file extension must be .betadb]
 * @param {boolean} [prettier=false] - Whether to format the database file into a readable file (only works if encryption is disabled)
 * @param {number} [interval=1000] - The rate (in miliseconds) at which the database file gets updated (the cache remains live)
 * @param {Object} encryption
 * @param {boolean} [encryption.enabled=true] - Whether to enable database encryption or not (default is true)
 * @param {string} [encryption.secretKey="beta-was-here"] - The secret key which the encryption method uses to keep your password safe (default is "beta-was-here")
 * @param {Object} logging
 * @param {boolean} [logging.enabled=true] - Whether to enable console messages when anything happens
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
 *     enabled: true,
 *     secretKey: "beta-was-here",
 *   },
 *   {
 *     enabled: true,
 *     detailedErrors: true,
 *   }
 * );
 *
 * db.init();
 */

class EasyDB extends EventEmitter {
  // CLASS PROPERTIES
  public _options: { path: string; prettier: boolean; interval: number };
  public _encryption: { enabled: boolean; secretKey: string };
  public _logging: { enabled: boolean; detailedErrors: boolean };
  private _ready: boolean = false;
  private _cache: object = {};

  // CONSTRUCTOR
  constructor(
    private readonly options: {
      path?: string;
      prettier?: boolean;
      interval?: number;
    },
    private readonly encryption: {
      enabled?: boolean;
      secretKey?: string;
    },
    private readonly logging: {
      enabled?: boolean;
      detailedErrors?: boolean;
    }
  ) {
    super();

    // CHECK SETTINGS INCASE THERE ARE MISSING ITEMS
    // DATABASE OPTIONS
    this._options = {
      path: options.path || dataDefaults.path,
      prettier: options.prettier || dataDefaults.prettier,
      interval: options.interval || dataDefaults.interval,
    };

    // ENCRYPTION OPTIONS
    this._encryption = {
      enabled: encryption.enabled || encryptionDefaults.enabled,
      secretKey: encryption.secretKey || encryptionDefaults.secretKey,
    };

    // LOGGING OPTIONS
    this._logging = {
      enabled: logging.enabled || logDefaults.enabled,
      detailedErrors: logging.detailedErrors || logDefaults.detailedErrors,
    };
  }

  // INITIALIZATION FUNCTION
  public init(): void {
    // SHORT LOOP UNTIL DATABASE LOADED (IF IT FAILS IT WILL RETRY, MAXIMUM 5 ATTEMPTS)
    for (
      let attempts: number = 1;
      this._ready === false && attempts <= 5;
      attempts++
    ) {
      dbConsole.info(this, locale.info.attemptingToLoad, {
        attemptNumber: attempts,
      });
      if (fileExists(this._options.path) === true) {
        this._cache = readDB(this);
        dbConsole.log(this, locale.success.loadedSuccessfuly);
        this._ready = true;
        return;
      }
      dbConsole.warning(this, locale.warning.databaseNotFound, {
        pathToDB: this._options.path,
      });

      // CREATE DATABASE AND THEN RUN LOOP ONE MORE TIME
      createDB(this);
    }

    // IF THIS ERROR SHOWS UP I GENUINELY HAVE NO IDEA WHAT'S WRONG OR HOW TO FIX IT
    return dbConsole.error(this, locale.errors.failedToLoadUnknown);
  }
}

export { EasyDB };
