'use strict';
(function(module) {
  var accountList = {};
  accountList.allAccounts = [];
  accountList.accountIDs = [];

  // Replace with your client ID from the developer console.
  var CLIENT_ID = '90425361918-ve2unlo91glh26eqai2jstvcpr963qpo.apps.googleusercontent.com';

  // Set authorized scope.
  // var SCOPES = ['https://www.googleapis.com/auth/analytics.edit'];
  var SCOPES = ['https://www.googleapis.com/auth/analytics.manage.users'];


  function authorize(event) {
    // Handles the authorization flow.
    // `immediate` should be false when invoked from the button click.
    var useImmdiate = event ? false : true;
    var authData = {
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: useImmdiate
    };

    gapi.auth.authorize(authData, function(response) {
      var authButton = document.getElementById('auth-button');
      if (response.error) {
        authButton.hidden = false;
      } else {
        authButton.hidden = true;
        queryAccounts();
      }
    });
  }

  function queryAccounts() {
  // Load the Google Analytics client library.
    gapi.client.load('analytics', 'v3').then(function() {

    // Get a list of all Google Analytics accounts for this user
      var request = gapi.client.analytics.management.accounts.list();
      request.execute(printAccounts);
    });
  }

  function printAccounts(results) {
    if (results && !results.error) {
      var accounts = results.items;
      accounts.forEach(function(account) {
        return accountList.allAccounts.push(account);
      });
      accounts.forEach(function(accountIDs){
        return accountList.accountIDs.push(accountIDs.id);
      });
      accounts.forEach(function(accountIDs){
        listAccountUserLinks(accountIDs.id);
      });
    }
  }

  function listAccountUserLinks(accountID) {
    var request = gapi.client.analytics.management.accountUserLinks.list({
      'accountId': accountID
    });
    request.execute(printAccountUserLinks);
  }

  function printAccountUserLinks(results) {
    if (results && !results.error) {
      var accountLinks = results.items;
      for (var i = 0, accountUserLink; accountUserLink = accountLinks[i]; i++) {
        var entity = accountUserLink.entity;
        var accountRef = entity.accountRef;
        var userRef = accountUserLink.userRef;
        var permissions = accountUserLink.permissions;

        console.log('Account User Link Id: ' + accountUserLink.id);
        console.log('Account User Link Kind: ' + accountUserLink.kind);
        console.log('User Email: ' + userRef.email);
        console.log('Permissions effective: ' + permissions.effective);
        console.log('Permissions local: ' + permissions.local);
        console.log('Account Id: ' + accountRef.id);
        console.log('Account Kind: ' + accountRef.kind);
        console.log('Account Name: ' + accountRef.name);
      }
    }
  }

  // Add an event listener to the 'auth-button'.
  document.getElementById('auth-button').addEventListener('click', authorize);

  module.accountList = accountList;
}(window));
