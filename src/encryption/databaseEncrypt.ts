import { settings } from "../options/encryption";
import * as crypto from "crypto";
import { dbConsole } from "../utils/databaseConsole";
import { EasyDB } from "../structures/database";
import { locale } from "../data/locales";

/**
 * Will change a key size depending on the arguments given
 *
 * @param {string} key - The key you want to change the length of
 * @param {number} keyLength - The length to which you want the key changed
 * @returns {Buffer}
 */
const stretchKey = (key: string, keyLength: number): Buffer => {
  return crypto.pbkdf2Sync(key, key, 100000, keyLength, "sha512");
};

/**
 * Encrypts data
 *
 * @param {EasyDB} _this - Database Class
 * @param {object} contentObj - The object you want to encrypt
 * @returns {string}
 */
const encrypt = (_this: EasyDB, contentObj: object): string => {
  try {
    const cipher = crypto.createCipheriv(
      settings.algorithm,
      stretchKey(_this._encryption.secretKey, 32),
      stretchKey(_this._encryption.secretKey, 16)
    );
    let encrypted = cipher.update(JSON.stringify(contentObj), "utf-8", "hex");
    return encrypted + cipher.final("hex");
  } catch (err) {
    return dbConsole.error(_this, locale.errors.unableToEncrypt, {}, err);
  }
};

/**
 * Decrypts data
 *
 * @param {EasyDB} _this - Database Class
 * @param {string} encryptedContent - Encrypted data to decrypt
 * @returns {string}
 */
const decrypt = (_this: EasyDB, encryptedContent: string): string => {
  try {
    const decipher = crypto.createDecipheriv(
      settings.algorithm,
      stretchKey(_this._encryption.secretKey, 32),
      stretchKey(_this._encryption.secretKey, 16)
    );

    let decrypted = decipher.update(encryptedContent, "hex", "utf-8");
    return decrypted + decipher.final("utf-8");
  } catch (err) {
    return dbConsole.error(_this, locale.errors.unableToDecrypt, {}, err);
  }
};

export { encrypt, decrypt };
