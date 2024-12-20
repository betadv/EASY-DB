const locale: any = {
  errors: {
    unableToRead:
      "ERROR: Unable to read the database. \nThe database might have a corrupted format (wrongly formatted in json), it's possible you might have changed the secret key accidentally or switched encryption off and forgot to migrate your data;\nto migrate your database data, use the '<EasyDB>.migrate()' function, which is a separate function in the package.",
    alreadyLoaded:
      "ERROR: Database has already been initialized, you can't initialize it twice.",
    unableToCreateFile:
      "ERROR: Unable to create the database files; you may try again or manually create the files.",
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
