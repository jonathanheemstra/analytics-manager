'use strict';
(function(module) {
  const accountList = {};

  accountList.allAccounts = [];
  accountList.accountIDs = [];
  accountList.allAccountUsers = [];

  // Replace with your client ID from the developer console.
  const CLIENT_ID = '90425361918-ve2unlo91glh26eqai2jstvcpr963qpo.apps.googleusercontent.com';

  // Set authorized scope.
  // var SCOPES = ['https://www.googleapis.com/auth/analytics.edit'];
  const SCOPES = ['https://www.googleapis.com/auth/analytics.manage.users'];


  function authorize(event) {
    // Handles the authorization flow.
    // `immediate` should be false when invoked from the button click.
    let useImmdiate = event ? false : true;
    let authData = {
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: useImmdiate
    };

    gapi.auth.authorize(authData, function(response) {
      const authButton = document.getElementById('auth-button');
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
      const request = gapi.client.analytics.management.accounts.list();
      request.execute(printAccounts);
    });
  }

  function printAccounts(results) {
    if (results && !results.error) {
      const accounts = results.items;
      accounts.forEach(account => {
        return accountList.allAccounts.push(account);
      });
      accounts.forEach(accountIDs => {
        return accountList.accountIDs.push(accountIDs.id);
      });
      accounts.forEach(accountIDs => {
        listAccountUserLinks(accountIDs.id);
      });
      accountListView.renderPage(accountList.allAccounts);
    }
  }

  function listAccountUserLinks(accountID) {
    const request = gapi.client.analytics.management.accountUserLinks.list({
      'accountId': accountID
    });
    request.execute(printAccountUserLinks);
  }

  function printAccountUserLinks(results) {
    if (results && !results.error) {
      const accountLinks = results.items;
      for (let i = 0, accountUserLink; accountUserLink = accountLinks[i]; i++) {
        accountList.allAccountUsers.push(accountUserLink);
      }
    }
  }

  // Add an event listener to the 'auth-button'.
  document.getElementById('auth-button').addEventListener('click', authorize);

  module.accountList = accountList;
})(window);
