import fs from "fs-extra";

/**
 * Creates a file at the desired destination
 *
 * @param {string} path - Path of file (will automatically create any missing directories)
 * @param {?string} [content] - Any additional data to be written to the file (optional)
 */
const createFile = (path: string, content?: string): void => {
  fs.ensureFileSync(path);
  if (content) return fs.appendFileSync(path, content);
  return fs.appendFileSync(path, "{}");
};

/**
 * Checks if the desired file exists
 *
 * @param {string} path - Path of file
 * @returns {boolean}
 */
const fileExists = (path: string): boolean => {
  return fs.pathExistsSync(path);
};

/**
 * Reads data from the desired file
 *
 * @param {string} path - Path of file (will automatically create the file at the desired destination if it cannot be found)
 * @returns {string}
 */
const readFile = (path: string): string => {
  if (!fileExists(path)) createFile(path);
  return fs.readFileSync(path, { encoding: "utf-8" });
};

/**
 * Write new content to the destination file
 *
 * @param {string} path
 * @param {string} content
 */
const writeFile = (path: string, content: string): void => {
  return fs.writeFileSync(path, content);
};

export { createFile, readFile, fileExists, writeFile };
