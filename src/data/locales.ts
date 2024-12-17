const locale: any = {
  errors: {
    unableToRead:
      "ERROR: Unable to read the database. \nThe database might have a corrupted format (wrongly formatted in json), or you might have switched encryption settings, which can't work together;\nto migrate your database use the '<EasyDB>.migrate()' function which is a separate function in the package",
    alreadyLoaded:
      "ERROR: Database has already been initialized, you can't initialize it twice.",
    unableToCreateFile:
      "ERROR: Unable to create the database files; you may try again or manually create the files",
  },
  info: {
    attemptingToLoad:
      "INFO: Attempting to load the database; currently on try {0}",
  },
  success: {
    loadedSuccessfuly: "SUCCESS: Database has been successfuly loaded.",
  },
};

export { locale };
