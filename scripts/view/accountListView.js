'use strict';
(function(module) {
  const accountListView = {};

  const $signIn = $('#sign-in');
  const $accountPrintOut = $('#account-printout');
  const $accountUsers = $('.account-users');
  const $expand = $('.expand');
  const accountTableTemplate = Handlebars.compile($('#account-table-template').text());

  accountListView.renderAccountListTable = function(currentAccount) {
    let source = $('#account-table-template').html();
    let template = Handlebars.compile(source);
    return template(currentAccount);
  };

  accountListView.renderAccountUserTable = function(currentAccount) {
    let source = $('#account-users-template').html();
    let template = Handlebars.compile(source);
    return template(currentAccount);
  };

  // accountListView.renderPage = function(data) {
  //   let allAccounts = data.allAccounts;
  //   let allAccountUsers = data.allAccountUsers;
  //   console.log('allAccountUsers', allAccountUsers);
  //   allAccounts.map(function(curr,idx) {
  //     $('tbody').append(accountListView.renderAccountListTable(curr));
  //     allAccountUsers.forEach(function(users){
  //       if (allAccountUsers[idx].entity.accountRef.id === allAccounts.id) {
  //         $(accountListView.renderAccountUserTable(users)).insertAfter('.account');
  //       }
  //     });
  //   });
  // }

  accountListView.renderPage = function(accounts, users) {
    let allAccounts = accounts;
    let allAccountUsers = users;
    console.log('allAccountUsers', allAccountUsers);
    allAccounts.map(function(curr,idx) {
      $('tbody').append(accountListView.renderAccountListTable(curr));
      allAccountUsers.forEach(function(users){
        if (allAccountUsers[idx].entity.accountRef.id === allAccounts.id) {
          $(accountListView.renderAccountUserTable(users)).insertAfter('.account');
        }
      });
    });
  }

  // $accountPrintOut.hide();
  // $accountUsers.hide();
  //
  //
  // $signIn.on('click', 'button', function() {
  //   $signIn.hide();
  //   $accountPrintOut.fadeIn();
  // });

  $expand.on('click', function(){
    $accountUsers.show();
  });

  module.accountListView = accountListView;
})(window);
