import fs from "fs-extra";

const createFile = (path: any, content?: string): void => {
  fs.ensureFileSync(path);
  if (content) return fs.appendFileSync(path, content);
  return fs.appendFileSync(path, "{}");
};

const fileExists = (path: any): boolean => {
  return fs.pathExistsSync(path);
};

const readFile = (path: any): string => {
  if (!fileExists(path)) createFile(path);
  return fs.readFileSync(path, { encoding: "utf-8" });
};

const writeFile = (path: any, content: any): void => {
  return fs.writeFileSync(path, content);
};

export { createFile, readFile, fileExists, writeFile };
