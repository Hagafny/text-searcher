const documentsService = require('../services/documents.service');
const searchService = require('../services/search.service');

const index = (indexes) => {
  documentsService.add(indexes);
};

const search = (query) => searchService.search(query);

module.exports = {
  index,
  search,
};
