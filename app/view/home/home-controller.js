'use strict';

module.exports = ['$log', '$rootScope', 'authService', 'accountService', HomeController];

function HomeController($log, $rootScope, authService, accountService){
  $log.debug('init homeCtrl');

  this.load = function() {
    authService.loadGAPI();
  };

  this.login = function() {
    authService.signIn();
  };

  this.getAccounts = function() {
    accountService.getAccounts();
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.load();
  });
}
