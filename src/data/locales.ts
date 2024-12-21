import { packageConfig } from "./package";

const locale: any = {
  errors: {
    unableToRead: `ERROR: Unable to read the database. \nThe database might have a corrupted format (wrongly formatted in json), it's possible you might have changed the secret key accidentally or switched encryption off and forgot to migrate your data;\nto migrate your database data, use the '<EasyDB>.migrate()' function, which is a separate function in the package. If you run into trouble, please refer to the documentation. \n${packageConfig.docsLink}`,
    alreadyLoaded:
      "ERROR: Database has already been initialized, you can't initialize it twice.",
    unableToCreateFile:
      "ERROR: Unable to create the database files; you may try again or manually create the files.",
    failedToLoadUnknown:
      "ERROR: Unable to load database due to unknown reasons; (yes, quite literally unknown - since this is a test string)",
    unableToDecrypt:
      "ERROR: Unable to decrypt the provided content; please check your key and make sure it is the correct one.",
    unableToEncrypt:
      "ERROR: Unable to encrypt the provided content; please check your key and make sure it is the correct one.",
    incorrectSettings: `ERROR: The following values appear to be wrong, please refer to the documentation (${packageConfig.docsLink}) if you run into trouble when setting up your database: {{incorrectSettings}}`,
    settings: {
      invalidFileType: "ERROR: Database file path does not end in .betadb.",
      invalidItemType: {
        singleItem: `ERROR: Property \`{{propertyType}}.{{propertyKey}}\` is of the wrong type ({{wrongType}}), the correct type is \`{{correctType}}\`. Please double check your configuration; if you run into trouble, refer to the documentation.\n${packageConfig.docsLink}`,
        // TODO: Allow all the problems to show up at once to provide a better experience for the end user
        //   multipleItems: `ERROR: The following properties have the wrong type: {{incorrectProperties}}\nPlease correct the mistakes; if you run into trouble, refer to the documentation.\n${packageConfig.docsLink}`,
      },
    },
  },
  info: {
    attemptingToLoad:
      "INFO: Attempting to load the database; currently on try {{attemptNumber}}.",
  },
  success: {
    loadedSuccessfuly: "SUCCESS: Database has been successfuly intialized.",
  },
  warning: {
    databaseNotFound:
      "WARNING: Database file could not be found at the provided path `{{pathToDB}}`; we will create the file for you.",
  },
};

export { locale };
