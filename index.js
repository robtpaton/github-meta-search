#!/usr/bin/env node
'use strict';

const rc = require('rc');
const fs = require('fs');

const cli = require('./lib/cli');

function outputUsage() {
  console.log(fs.readFileSync('./USAGE.txt', 'utf8'));
}

function buildOptions(configuration) {
  if (configuration.h || configuration.help) {
    outputUsage();
    process.exit();
  }

  return {
    query: configuration._,
    github: configuration.github,
    repoQuery: configuration['r'] || configuration['repo-query']
  };
}

const defaultConfiguration = {
  github: {
    username: null,
    token: null
  },
  'repo-query': null,
  query: null
};
const configuration = rc('githubmetasearch', defaultConfiguration);
const options = buildOptions(configuration);

cli.run(options);
