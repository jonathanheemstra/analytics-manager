'use strict';

module.exports = ['$q', '$log', '$window', authService];

function authService($q, $log, $window) {
  $log.debug('inside authService');

  let service = {};

  let token = null;
  var GoogleAuth;
  var SCOPE = 'https://www.googleapis.com/auth/analytics.manage.users';

  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
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
      setSigninStatus();
    });
  }

  function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
      GoogleAuth.signOut();
    } else {
      GoogleAuth.signIn();
    }
  }

  function revokeAccess() {
    GoogleAuth.disconnect();
  }

  function setSigninStatus(isSignedIn) {
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    setToken(user.Zi.access_token);
    if (isAuthorized) {
      $('#sign-in-or-out-button').html('Sign out');
      $('#revoke-access-button').css('display', 'inline-block');
      $('#auth-status').html('You are currently signed in and have granted ' +
          'access to this app.');
    } else {
      $('#sign-in-or-out-button').html('Sign In/Authorize');
      $('#revoke-access-button').css('display', 'none');
      $('#auth-status').html('You have not authorized this app or you are ' +
          'signed out.');
    }
  }

  function updateSigninStatus(isSignedIn) {
    setSigninStatus();
  }

  function setToken(_token){
    $log.debug('authService.setToken()');

    if (! _token) {
      return $q.reject(new Error('no token'));
    }

    $window.localStorage.setItem('token', _token);
    token = _token;
    $log.debug('setToken', token);
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
      $log.debug('getToken', token);
      return $q.resolve(token);
    }

    token = $window.localStorage.getItem('token');
    if (token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  service.logout = function(){
    $log.debug('authService.logout()');

    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
  };

  return service;
}
