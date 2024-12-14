import { EventEmitter } from "events";
import { defaults } from "../options/db";

interface Options {
  path: string;
  beautify: boolean;
}

/**
 * Default database constructor, this will allow you to initialize the database by using the init() function
 * @class
 * @constructor
 * @param {Object} options
 * @param {string} options.path - The path to the database base file (default is "./database/main.betadb")
 * @param {boolean} options.prettier - Whether to format the database file into a readable file (only works if encryption is disabled)
 * @param {Object} options.encryption
 * @param {boolean} options.encryption.enabled - Whether to enable database encryption or not
 * @param {string} options.encryption.secretKey - The secret key which the encryption method uses to keep your password safe (default is "beta-was-here")
 */

class EasyDB extends EventEmitter {
  constructor(
    options: {
      path: "./database/main.betadb";
      prettier: true;
      encryption: {
        enabled: true;
        secretKey: "beta-was-here";
      };
    } = defaults
  ) {
    super();

    console.log(this);
  }

  // TODO: Init function
}

export { EasyDB };
