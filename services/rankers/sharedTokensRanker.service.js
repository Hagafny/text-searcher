const rank = (query) => {
  query = turnToSet(query);
  return (tokens) => intersection(query, tokens);
};

const turnToSet = (query) => new Set(query.split(' '));

const intersection = (a, b) => {
  const intersection = new Set([...a].filter((x) => b.has(x)));
  return intersection.size;
};

module.exports = {
  rank,
};
