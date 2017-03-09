'use strict';

module.exports = ['$q', '$log', '$window', '$rootScope', authService];

function authService($q, $log, $window, $rootScope) {
  $log.debug('inside authService');

  let service = {};

  let token = null;
  var GoogleAuth;
  var SCOPE = 'https://www.googleapis.com/auth/analytics.manage.users';

  function handleClientLoad() {
    $log.debug('authService.handleClientLoad');
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    $log.debug('authService.initClient');
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/analytics/v3/rest';

    gapi.client.init({
      'apiKey': `${__API_KEY__}`,
      'discoveryDocs': [discoveryUrl],
      'clientId': `${__CLIENT_ID__}`,
      'scope': SCOPE
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
      var user = GoogleAuth.currentUser.get();
      $log.debug('authService.initClient user', user);
      setSigninStatus();
    });
  }

  function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
      $log.debug('authService.handleAuthClick IF');
      GoogleAuth.signOut();
    } else {
      $log.debug('authService.handleAuthClick ELSE');
      GoogleAuth.signIn();
    }
  }

  function revokeAccess() {
    $log.debug('authService.revokeAccess');
    GoogleAuth.disconnect();
  }

  function setSigninStatus(isSignedIn) {
    $log.debug('authService.setSigninStatus');
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    setToken(user.Zi.access_token);
    $rootScope.authenticationStatus = true;
  }

  function updateSigninStatus(isSignedIn) {
    $log.debug('authService.updateSigninStatus', isSignedIn);
    setSigninStatus();
  }

  function setToken(_token){
    $log.debug('authService.setToken()');

    if (! _token) {
      return $q.reject(new Error('no token'));
    }

    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  }

  service.loadGAPI = function() {
    handleClientLoad();
  };

  service.signIn = function() {
    handleAuthClick();
  };

  service.getToken = function(){
    $log.debug('authService.getToken');
    if (token) {
      $log.debug('authService.getToken', token);
      return $q.resolve(token);
    }

    token = $window.localStorage.getItem('token');
    if (token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  service.logout = function(){
    $log.debug('authService.logout()');
    handleAuthClick();

    $window.localStorage.removeItem('token');
    token = null;
    $rootScope.authenticationStatus = false;
    return $q.resolve();
  };

  return service;
}
