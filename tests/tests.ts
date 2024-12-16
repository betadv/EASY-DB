import { EasyDB } from "../index";

const db = new EasyDB();

console.log(db);
db.init();
// const originalText = "Sensitive information";
// const encryptedText = db.__encrypt(originalText);
// const decryptedText = db.__decrypt(encryptedText);
