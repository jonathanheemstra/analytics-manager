'use strict';

module.exports = ['$q', '$log', '$http', authService];

function authService($q, $log, $http) {
  $log.debug('inside authService');

  let service = {};

  service.authorize = function(event) {
    var useImmdiate = event ? false : true;
    var authData = {
      client_id: '90425361918-ve2unlo91glh26eqai2jstvcpr963qpo.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      immediate: useImmdiate
    };

    gapi.auth.authorize(authData, function(response) {
      var authButton = document.getElementById('auth-button');
      if (response.error) {
        authButton.hidden = false;
      }
      else {
        authButton.hidden = true;
        queryAccounts();
      }
    });
  };

  service.getAccounts = function() {
    $log.debug('getAccounts');

    $http.get();
  };

  return service;
}
