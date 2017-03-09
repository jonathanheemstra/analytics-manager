'use strict';

module.exports = ['$log', '$rootScope', 'authService', 'accountService', HomeController];

function HomeController($log, $rootScope, authService, accountService){
  $log.debug('init homeCtrl');

  this.accounts = [];

  this.load = function() {
    authService.loadGAPI();
  };

  this.getAccounts = function() {
    accountService.getAccounts()
    .then( res => {
      this.accounts = res.data.items;
      return this.accounts;
    });
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.load();
  });
}
