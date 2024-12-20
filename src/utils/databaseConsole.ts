import { styleText } from "util";
import { EasyDB } from "../structures/database";

const dbConsole: any = {
  log: (_this: EasyDB, text: any, variables?: object) => {
    if (_this._logging.enabled === false) return;
    let content = text;

    // UPDATE ANY IN-TEXT VARIABLES IF THERE ARE ANY
    if (typeof variables === "object")
      for (const [key, value] of Object.entries(variables)) {
        content = content.replace("{{" + key + "}}", value);
      }
    console.log(styleText(["bold", "green"], content));
  },
  warning: (_this: EasyDB, text: any, variables: object) => {
    if (_this._logging.enabled === false) return;
    let content: string = text;
    // UPDATE ANY IN-TEXT VARIABLES IF THERE ARE ANY
    if (typeof variables === "object")
      for (const [key, value] of Object.entries(variables)) {
        content = content.replace("{{" + key + "}}", value);
      }
    if (_this._logging.detailedErrors)
      return console.error(styleText(["bold", "yellow"], content));
    console.error(styleText(["bold", "yellow"], content));
  },
  info: (_this: EasyDB, text: any, variables?: object) => {
    if (_this._logging.enabled === false) return;
    let content = text;

    // UPDATE ANY IN-TEXT VARIABLES IF THERE ARE ANY
    if (typeof variables === "object")
      for (const [key, value] of Object.entries(variables)) {
        content = content.replace("{{" + key + "}}", value);
      }
    console.error(styleText(["bold", "blue"], content));
  },
  error: (_this: EasyDB, text: any, variables: object, error: any) => {
    if (_this._logging.enabled === false) return;
    let content: string = text;
    // UPDATE ANY IN-TEXT VARIABLES IF THERE ARE ANY
    if (typeof variables === "object")
      for (const [key, value] of Object.entries(variables)) {
        content = content.replace("{{" + key + "}}", value);
      }

    if (_this._logging.detailedErrors)
      throw console.error(
        styleText(["bold", "redBright"], content) + "\n" + error
      );
    new Error(styleText(["bold", "redBright"], content));
  },
};

export { dbConsole };
