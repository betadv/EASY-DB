import { EasyDB } from "../structures/database";
import { events } from "../data/events";

const emitEvent = (
  _this: EasyDB,
  type: string,
  customMessage?: string,
  customCode?: string,
  customName?: string
): void => {
  _this.emit(customName ?? type, {
    code: customCode ?? events[type].code,
    message: customMessage ?? events[type].message,
  });
};

export { emitEvent };
