/*
CODE FORMAT:
FIRST HALF (type of event)
0 - core function (initialization, errors etc...)
1 - database file related functions (updating database, creating database file etc...)
2 - database content related functions (set(), delete() etc...)
DIVIDE CODE BY AN x
SECOND HALF (the function of the event itself - can be found down below)

*/

import { locale } from "./locales";

let events: Record<string, { code: string; message: string }> = {
  // CORE
  databaseReady: {
    code: "0x00",
    message: locale.events.databaseReady,
  },
  // FILES
  databaseCreated: {
    code: "1x00",
    message: locale.events.databaseCreated,
  },
  databaseUpdated: {
    code: "1x01",
    message: locale.events.databaseUpdated,
  },
  databaseUpdatedInterval: {
    code: "1x02",
    message: locale.events.databaseUpdatedInterval,
  },
};

export { events };
