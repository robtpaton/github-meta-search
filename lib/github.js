'use strict';

const request = require('request-promise-native');

function buildRepoSearchRequestOptions(options) {
  return {
    uri: 'https://api.github.com/search/repositories',
    qs: {
      'per_page': 100,
      q: options.repoQuery
    },
    headers: {
      'User-Agent': options.github.username
    },
    auth: {
      user: options.github.username,
      pass: options.github.token
    },
    json: true
  };
}

function buildSearchUrl(repos, options) {
  const repoQualifiers = repos.map((item) => `repo:${item.full_name}`);
  const searchTerms = [options.query, ...repoQualifiers];
  const q = searchTerms.join('+');

  return `https://github.com/search?utf8=%E2%9C%93&type=Code&q=${q}`;
}

function getSearchUrl(options) {
  const requestOptions = buildRepoSearchRequestOptions(options);

  return request(requestOptions)
    .then(({ items }) => buildSearchUrl(items, options));
}

module.exports = {
  getSearchUrl
};
