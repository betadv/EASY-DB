import { styleText } from "util";
import { EasyDB } from "../structures/database";

/**
 * Database Console Custom Functions
 * @type {dbConsole}
 * @property {Function} dbConsole.success - Preferrably for success messages, green in color
 * @property {Function} dbConsole.warning - Preferrably for warning messages, yellow in color
 * @property {Function} dbConsole.info - Preferrably for information messages, blue in color
 * @property {Function} dbConsole.error - Preferrably for error messages, red in color
 */
const dbConsole = {
  success: (_this: EasyDB, text: any, variables?: object): void => {
    if (_this._logging.enabled === false) return;
    let content = text;

    // UPDATE ANY IN-TEXT VARIABLES IF THERE ARE ANY
    if (typeof variables === "object")
      for (const [key, value] of Object.entries(variables)) {
        content = content.replace("{{" + key + "}}", value);
      }
    console.log(styleText(["bold", "green"], content));
  },
  warning: (_this: EasyDB, text: any, variables?: object): void => {
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
  info: (_this: EasyDB, text: any, variables?: object): void => {
    if (_this._logging.enabled === false) return;
    let content = text;

    // UPDATE ANY IN-TEXT VARIABLES IF THERE ARE ANY
    if (typeof variables === "object")
      for (const [key, value] of Object.entries(variables)) {
        content = content.replace("{{" + key + "}}", value);
      }
    console.error(styleText(["bold", "blue"], content));
  },
  error: (_this: EasyDB, text: any, variables?: object, error?: any): void => {
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
