import { styleText } from "util";

const dbConsole: any = {
  log: (_this: any, text: any) => {
    if (_this._logging.enabled === false) return;
    console.log(styleText(["bold", "green"], text));
  },
  warning: (_this: any, text: any, error: any) => {
    if (_this._logging.enabled === false) return;
    if (_this._logging.detailedErrors)
      throw console.error(styleText(["bold", "yellow"], text) + "\n" + error);
    console.error(styleText(["bold", "yellow"], text));
  },
  info: (_this: any, text: any) => {
    if (_this._logging.enabled === false) return;
    console.error(styleText(["bold", "blue"], text));
  },
  error: (_this: any, text: any, error: any) => {
    if (_this._logging.enabled === false) return;
    if (_this._logging.detailedErrors)
      throw console.error(
        styleText(["bold", "redBright"], text) + "\n" + error
      );
    console.error(styleText(["bold", "redBright"], text));
  },
};

export { dbConsole };
