'use strict';
(function(module) {
  const $signIn = $('#sign-in');
  const $uploadUser = $('#upload-users');

  $uploadUser.hide();

  $('#auth-button').on('click', function(){
    $('#auth-button').hide();
    $uploadUser.fadeIn();
  });

  module.addUserView = addUserView;
}(window));
