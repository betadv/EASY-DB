import { packageConfig } from "./package";

const locale: any = {
  errors: {
    unableToRead: `ERROR: Unable to read the database. \nThe database might have a corrupted format (wrongly formatted in json syntax), it's possible you might have changed the secret key accidentally or switched encryption off and forgot to migrate your data;\nto migrate your database data, use the '<EasyDB>.migrate()' function, which is a separate function in the package. If you run into trouble, please refer to the documentation. \n${packageConfig.docsLink}`,
    alreadyLoaded:
      "ERROR: Database has already been initialized, you can't initialize it twice.",
    unableToCreateFile:
      "ERROR: Unable to create the database files ({{issue}}); you may try again or manually create the files.",
    failedToLoadUnknown:
      "ERROR: Unable to load database due to unknown reasons; (yes, quite literally unknown - since this is a test string)",
    unableToDecrypt:
      "ERROR: Unable to decrypt the database; please check your database encryption settings and ensure that the settings are correct.",
    unableToEncrypt:
      "ERROR: Unable to encrypt the database; please check your database encryption settings and ensure that the settings are correct.",
    settings: {
      invalidDatabasePathType: `Database file path (\`{{currentPath}}\`) does not end in \`.betadb\`; please fix your configuration.`,
      invalidItemType: {
        singleItem: `ERROR: The property \`{{propertyType}}.{{propertyKey}}\` in your database configuration is of the wrong type ({{wrongType}}), the correct type is \`{{correctType}}\`. Please double check your configuration; if you run into trouble, refer to the documentation.\n${packageConfig.docsLink}`,
        multipleItems: `ERROR: The following issues have been found in your database configuration: \n{{incorrectProperties}}\nPlease correct the mistakes; if you run into trouble, refer to the documentation.\n${packageConfig.docsLink}`,
      },
    },
  },
  info: {
    attemptingToLoad:
      "INFO: Attempting to load the database; currently on try number {{attemptNumber}}...",
  },
  success: {
    loadedSuccessfuly: "SUCCESS: Database has been successfuly intialized.",
  },
  warning: {
    databaseNotFound:
      "WARNING: Database file could not be found at the provided path `{{pathToDB}}`; the file will be created for you.",
  },
  events: {
    databaseReady: "NOTE: Database has been initialized.",
    databaseCreated: "NOTE: Database file has been created in your stead.",
    databaseUpdated: "NOTE: Database file has been updated.",
    databaseUpdatedInterval:
      "NOTE: Database file has been updated on your specified interval.",
  },
};

export { locale };
