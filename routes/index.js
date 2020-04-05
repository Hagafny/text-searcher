const routes = require('express').Router();
const controller = require('../controllers');

routes.post('/index', (req, res) => {
  try {
    const indexes = Object.keys(req.body);
    controller.index(indexes);
    res.status(200).end('Index added successfully');
  } catch (e) {
    res.status(500).end(e.message);
  }
});

routes.post('/search', (req, res) => {
  try {
    const query = Object.keys(req.body)[0];
    const results = controller.search(query);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).end(e.message);
  }
});

module.exports = routes;
