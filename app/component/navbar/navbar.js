'use strict';

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavBarController],
  controllerAs: 'navbarCtrl'
};

function NavBarController($log, $location, $rootScope, authService) {
  $log.debug('NavBarController');

  $log.debug('init homeCtrl');

  this.load = function() {
    authService.loadGAPI();
  };

  this.login = function() {
    authService.signIn();
  };

  this.logout = function() {
    authService.logout();
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.load();
  });
}
