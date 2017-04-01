'use strict';

const opn = require('opn');

module.exports = {
  open: (url) => {
    return opn(url, { wait: false });
  }
};
