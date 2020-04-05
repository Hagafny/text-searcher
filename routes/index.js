const routes = require('express').Router();
const documentsService = require('../services/documents.service');
const SearchService = require('../services/search.service');
routes.post('/index', (req, res) => {
  try {
    const indexes = Object.keys(req.body);
    documentsService.add(indexes);
    res.status(200).end('Index added successfully');
  } catch (e) {
    res.status(500).end(e.message);
  }
});

routes.post('/search', (req, res) => {
  const query = Object.keys(req.body)[0];
  const searchService = new SearchService();
  const results = searchService.search(query);

  console.log(results)
  res.status(200).end('Index added successfully');

});

module.exports = routes;
