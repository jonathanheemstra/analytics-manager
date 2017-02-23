'use strict';

module.exports = ['$q', '$log', authService];

function authService($q, $log) {
  $log.debug('inside authService');

  let service = {};

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

  service.loadGAPI = function() {
    handleClientLoad();
  };

  service.signIn = function() {
    handleAuthClick();
  };

  return service;
}
