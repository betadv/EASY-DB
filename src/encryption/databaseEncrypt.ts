import assert from "assert";

import { settings } from "../options/encryption";
import * as crypto from "crypto";

const stretchKey = (key, keyLength) => {
  let salt = crypto.randomBytes(16);
  return crypto.pbkdf2Sync(key, "betadv-was-here", 100000, keyLength, "sha512");
};

const encrypt = (contentObj: object, key: string): any => {
  const content = JSON.stringify(contentObj);
  const cipher = crypto.createCipheriv(
    settings.algorithm,
    stretchKey(key, 32),
    stretchKey(key, 16)
  );
  let encrypted = cipher.update(content, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (encryptedContent: string, key: string): any => {
  const decipher = crypto.createDecipheriv(
    settings.algorithm,
    stretchKey(key, 32),
    stretchKey(key, 16)
  );
  let decrypted = decipher.update(encryptedContent, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

export { encrypt, decrypt };
