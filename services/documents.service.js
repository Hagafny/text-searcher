const fs = require('fs');
const dbFile = require('../db.json');
const documents_key = 'documents';

let documentsDB = dbFile[documents_key];

const getAll = () => {
  return documentsDB;
};

const add = (documents) => {
  if (Array.isArray(documents)) {
    documentsDB = [...documentsDB, ...documents];
  } else if (typeof document === 'string') {
    documentsDB = [...documentsDB, documents];
  } else {
    throw TypeError('Argument should be either an array or a string');
  }

  save();
};

const save = () => {
  const db = {
    [documents_key]: documentsDB,
  };

  const jsonContent = JSON.stringify(db);

  fs.writeFile('db.json', jsonContent, (err) => {
    if (err) {
      return console.error(
        'An error occured while writing JSON Object to File.'
      );
    }
  });
};

module.exports = {
  getAll,
  add,
};
