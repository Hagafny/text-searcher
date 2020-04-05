const splitTokenization = require('./tokenizers/splitTokenization.service');
const sharedTokensRanker = require('./rankers/sharedTokensRanker.service');
const documentsService = require('./documents.service');

class SearchService {
  constructor(tokenService, rankService) {
    this._tokenService = tokenService || splitTokenization;
    this._rankService = rankService || sharedTokensRanker;
    this._tokenizedDocuments = this._runTokenization(documentsService.getAll());
    this._listenToEvents();
  }

  set tokenService(service) {
    this._tokenService = service;
  }

  set comparisonService(service) {
    this._rankService = service;
  }

  _listenToEvents() {
    documentsService.documentsEventEmitter.on('document.added', (document) => {
      this._tokenizedDocuments[document] = this._tokenizeDocument(document);
    });
  }
  _runTokenization(documents) {
    return documents.reduce((tokenizedDocuments, document) => {
      tokenizedDocuments[document] = this._tokenizeDocument(document);
      return tokenizedDocuments;
    }, {});
  }

  _tokenizeDocument(document) {
    return this._tokenService.tokenize(document);
  }

  _sortByRank(resultA, resultB) {
    const rankA = resultA[1];
    const rankB = resultB[1];
    return rankB - rankA;
  }

  /* We expect any rankService to have a rank property that returns a function.
     With the returned function, given a list of tokens, it will return a score
  */
  search(query) {
    const rank = this._rankService.rank(query);

    return Object.entries(this._tokenizedDocuments)
      .reduce((results, [input, tokens]) => {
        const rankScore = rank(tokens);

        if (rankScore > 0) {
          results.push([input, rankScore]);
        }
        return results;
      }, [])
      .sort(this._sortByRank);
  }
}

module.exports = SearchService;
