import { settings } from "../options/encryption";
import * as crypto from "crypto";

const stretchKey = (key: string, keyLength: number) => {
  return crypto.pbkdf2Sync(key, key, 100000, keyLength, "sha512");
};

const encrypt = (contentObj: object, key: string): any => {
  const cipher = crypto.createCipheriv(
    settings.algorithm,
    stretchKey(key, 32),
    stretchKey(key, 16)
  );
  let encrypted = cipher.update(JSON.stringify(contentObj), "utf-8", "hex");
  return encrypted + cipher.final("hex");
};

const decrypt = (encryptedContent: string, key: string): any => {
  console.log(typeof encryptedContent, encryptedContent, key);

  const decipher = crypto.createDecipheriv(
    settings.algorithm,
    stretchKey(key, 32),
    stretchKey(key, 16)
  );

  let decrypted = decipher.update(encryptedContent, "hex", "utf-8");
  return decrypted + decipher.final("utf-8");
};

export { encrypt, decrypt };
