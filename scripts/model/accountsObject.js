'use strict';
(function(module) {
  var accountsObject = {};

  accountsObject.Accounts = function(opts) {
    Object.keys(opts).forEach(function(prop) {
      this[prop] = opts[prop];
    }, this);
  };

  module.accountsObject = accountsObject;
}(window));
