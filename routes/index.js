const routes = require('express').Router();
const documentsService = require('../services/documents.service');

routes.post('/index', (req, res) => {
  try {
    const indexes = Object.keys(req.body);
    documentsService.add(indexes);
    res.status(200).end('Index added successfully');
  } catch (e) {
    res.status(500).end(e.message);
  }
});

routes.post('/search', (req, res) => {});

module.exports = routes;
