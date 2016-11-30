'use strict';
(function(module) {
  const accountListView = {};

  const $signIn = $('#sign-in');
  const $accountPrintOut = $('#account-printout');
  const $accountUsers = $('.account-users');
  const $expand = $('.expand');
  const accountTableTemplate = Handlebars.compile($('#account-table-template').text());

  accountListView.renderTable = function(data) {
    let source = $('#account-table-template').html();
    let template = Handlebars.compile(source);
    return template(data);
  };

  $accountPrintOut.hide();
  $accountUsers.hide();


  $signIn.on('click', 'button', function() {
    $signIn.hide();
    $accountPrintOut.fadeIn();
  });
  $expand.on('click', function(){
    $accountUsers.show();
  });

  module.accountListView = accountListView;
}(window));
