const fs = require('fs');
const EventEmitter = require('events');

const dbFile = require('../db.json');
const documents_key = 'documents';
const documentsEventEmitter = new EventEmitter();
let documentsDB = new Set(dbFile[documents_key]);

const getAll = () => {
  return [...documentsDB];
};

const add = (documents) => {
  if (Array.isArray(documents)) {
    documents.forEach(_addDocument);
  } else if (typeof document === 'string') {
    _addDocument(documents);
  } else {
    throw TypeError('Argument should be either an array or a string');
  }

  _save();
};

/*  We emit an event to support adding more documents after the program is being run */
const _addDocument = (document) => {
  documentsDB.add(document);
  documentsEventEmitter.emit('document.added', document);
};

const _save = () => {
  const db = {
    [documents_key]: this.getAll(),
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
  documentsEventEmitter,
};
