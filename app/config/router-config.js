'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/');

  let states = [
    {
      name: 'home',
      url: '/',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}
