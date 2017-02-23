'use strict';

module.exports = ['$q', '$log', '$http', 'authService', accountService];

function accountService($q, $log, $http, authService) {

  let service = {};

  service.getAccounts = function() {

    return authService.getToken()
    .then( token => {
      let url = `https://www.googleapis.com/analytics/v3/management/accounts?key=${__API_KEY__}`;

      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( res => {
      console.log('res', res);
    });
  };

  return service;
}
