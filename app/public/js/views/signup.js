$(function () {

    var av = new AccountValidator();
    var sc = new SignupController();

    $('#account-form').ajaxForm({
        beforeSubmit: function (formData, jqForm, options) {
            return av.validateForm();
        },
        success: function (responseText, status, xhr, $form) {
            if (status == 'success') $('.modal-alert').modal('show');
        },
        error: function (e) {
            if (e.responseText == 'email-taken') {
                av.showInvalidEmail();
            } else if (e.responseText == 'username-taken') {
                av.showInvalidUserName();
            }
        }
    });
    $('#name-tf').focus();


    // setup the alert that displays when an account is successfully created //

    $('.modal-alert').modal({ show: false, keyboard: false, backdrop: 'static' });
    $('.modal-alert .modal-header h3').text('Success!');
    $('.modal-alert .modal-body p').html('Your account has been created.</br>Please verify your email to update your profile.');

});