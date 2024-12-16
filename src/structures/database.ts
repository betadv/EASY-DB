import { EventEmitter } from "events";

import { dataDefaults, encryptionDefaults } from "../options/db";

import { readDB } from "../utils/databaseFunctions";

/**
 * Default database constructor, this will allow you to initialize the database by using the init() function
 * @class
 * @constructor
 * @param {Object} options
 * @param {string} [path=./database/main.betadb] - The path to the database base file (default is "./database/main.betadb") [file extension must be .betadb]
 * @param {boolean} [prettier=false] - Whether to format the database file into a readable file (only works if encryption is disabled)
 * @param {Object} encryption
 * @param {boolean} [encryption.enabled=true] - Whether to enable database encryption or not (default is true)
 * @param {string} [encryption.secretKey="beta-was-here"] - The secret key which the encryption method uses to keep your password safe (default is "beta-was-here")
 */

class EasyDB extends EventEmitter {
  private _options: { path: string; prettier: boolean };
  private _encryption: { enabled: boolean; secretKey: string };
  constructor(
    readonly options: {
      path: string;
      prettier: boolean;
    } = dataDefaults,
    readonly encryption: {
      enabled: boolean;
      secretKey: string;
    } = encryptionDefaults
  ) {
    super();

    this._options = options;
    this._encryption = encryption;

    console.log(this._options);
  }

  public init() {
    console.log(readDB(this));
  }
  // TODO: Init function
}

export { EasyDB };
