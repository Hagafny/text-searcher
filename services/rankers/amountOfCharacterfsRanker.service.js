const rank = (query) => (tokens) => {
  const queryCharCount = query.length;
  let charCount = [...tokens].reduce((count, token) => {
    count += token.length;
    return count;
  }, 0);

  return 100 - Math.abs(queryCharCount - charCount);
};

module.exports = {
  rank,
};
