'use strict';

const github = require('./github');
const browser = require('./browser');

function checkOptions(options) {
  if (!options.github || !options.github.username || !options.github.token) {
    console.error('Github username and token are required');
    process.exit(1);
  } else {
    return true;
  }
}

function handleError(error) {
  console.error(error.message);
  process.exit(1);
}

function run(options) {
  if (checkOptions(options)) {
    return github.getSearchUrl(options)
      .then(browser.open)
      .catch(handleError);
  }
}

module.exports = {
  run
};
