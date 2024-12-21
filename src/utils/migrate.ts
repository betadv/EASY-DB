/* 
    TODO: Create migrate function from encrypted to decrypted version and vice-versa
    - When encrypting make the entire file non-formatted so no data gets transferred wrong.
    - Decrypting make it so that it comes out as per settings (prettier or not)
*/

import { EasyDB } from "../structures/database";

/**
 * Migrating your database over to encrypted / decrypted version
 *
 * @param {EasyDB} _this - Your database file (please do not initialize the database when migrating)
 * @param {string} pathToFile - The path to the output file (the default is: "./betadv/migratedData.betadb") [If the file destination already exists, the function will throw an error]
 * @returns {void}
 */
const migrate = (
  _this: EasyDB,
  pathToFile: string = "./betadv/migratedData.betadb"
): void => {
  return;
};

export { migrate };
