const splitTokenization = require('./tokenizers/splitTokenization.service');
const sharedTokensRanker = require('./rankers/sharedTokensRanker.service');
const documentsService = require('./documents.service');

class SearchService {
  constructor(tokenService, rankService) {
    this._tokenService = tokenService || splitTokenization;
    this._rankService = rankService || sharedTokensRanker;
    this._tokenizedDocuments = this._runTokenization(documentsService.getAll());
  }

  set tokenService(service) {
    this._tokenService = service;
  }

  set comparisonService(service) {
    this._rankService = service;
  }

  _runTokenization(documents) {
    return documents.reduce((tokenizedDocuments, document) => {
      tokenizedDocuments[document] = this._tokenService.tokenize(document);
      return tokenizedDocuments;
    }, {});
  }

  _sortByRank(resultA, resultB) {
    const rankA = resultA[1];
    const rankB = resultB[1];
    return rankB - rankA;
  }

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
