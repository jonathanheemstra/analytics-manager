'use strict';

module.exports = ['$log', '$rootScope', 'authService', HomeController];

function HomeController($log, $rootScope, authService){
  $log.debug('init homeCtrl');

  this.load = function() {
    authService.loadGAPI();
  };

  this.login = function() {
    authService.signIn();
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.load();
  });
}
