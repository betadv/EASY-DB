import { settings } from "../options/encryption";
import * as crypto from "crypto";

const stretchKey = (key: string, keyLength: number) => {
  return crypto.pbkdf2Sync(key, "betadv-was-here", 100000, keyLength, "sha512");
};

const encrypt = (contentObj: object, key: string): any => {
  const content = JSON.stringify(contentObj);
  const cipher = crypto.createCipheriv(
    settings.algorithm,
    stretchKey(key, 32),
    stretchKey(key, 16)
  );
  let encrypted = cipher.update(content, "utf-8", settings.encryptionType);
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (encryptedContent: string, key: string): string => {
  const decipher = crypto.createDecipheriv(
    settings.algorithm,
    stretchKey(key, 32),
    stretchKey(key, 16)
  );

  console.log(typeof encryptedContent, encryptedContent, key);

  try {
    let decrypted: string = decipher.update(
      encryptedContent,
      settings.encryptionType,
      "utf-8"
    );
    decrypted += decipher.final("utf-8");
    return decrypted.toString();
  } catch (err) {
    console.log(err);
  }

  return "";
};

export { encrypt, decrypt };
