'use strict';

const assert = require('assert');
const nock = require('nock');
const sinon = require('sinon');

const cli = require('../lib/cli');
const browser = require('../lib/browser');

const githubFixture = require('./fixtures/github.json');

const sandbox = sinon.sandbox.create();

describe('githubmetasearch', () => {
  beforeEach(() => {
    sandbox.stub(browser, 'open');
    sandbox.stub(process, 'exit');
    sandbox.spy(console, 'error');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('exits if github details are not provided', () => {
    cli.run({});
    sinon.assert.calledOnce(console.error);
    sinon.assert.notCalled(browser.open);
  });

  it('queries the github API for repos matching the repo query', () => {
    const nockOptions = {
      reqheaders: {
        'User-Agent': 'testusername',
        'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3R0b2tlbg=='
      }
    };
    const githubApi = nock('https://api.github.com', nockOptions)
      .get('/search/repositories?per_page=100&q=some%20repo%20query')
      .reply(200, githubFixture);

    return cli.run({
      github: {
        username: 'testusername',
        token: 'testtoken'
      },
      repoQuery: 'some repo query'
    }).then(() => {
      assert(githubApi.isDone());
    });
  });

  it('outputs the error message and does not open a browser if there is an error', () => {
    nock('https://api.github.com')
      .get('/search/repositories?per_page=100&q=some%20repo%20query')
      .reply(500, 'Error');

    return cli.run({
      github: {
        username: 'username',
        token: 'token'
      },
      repoQuery: 'some repo query',
      query: 'some code query'
    }).then(() => {
      sinon.assert.calledOnce(console.error);
      sinon.assert.notCalled(browser.open);
    });
  });

  it('opens a URL based on the repo search results and the provided query', () => {
    nock('https://api.github.com')
      .get('/search/repositories?per_page=100&q=some%20repo%20query')
      .reply(200, githubFixture);

    const expectedUrl = 'https://github.com/search?utf8=%E2%9C%93&type=Code&q=some code query+repo:repo1+repo:repo2';

    return cli.run({
      github: {
        username: 'username',
        token: 'token'
      },
      repoQuery: 'some repo query',
      query: 'some code query'
    }).then(() => {
      sinon.assert.calledWith(browser.open, expectedUrl);
    });
  });
});
