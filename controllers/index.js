const documentsService = require('../services/documents.service');
const SearchService = require('../services/search.service');

const searchService = new SearchService();

const index = (indexes) => {
  documentsService.add(indexes);
};

const search = (query) => searchService.search(query);

module.exports = {
  index,
  search,
};
