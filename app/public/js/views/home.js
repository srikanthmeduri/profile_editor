$(function () {

    var hc = new HomeController();
    var av = new AccountValidator();

    $('#account-settings').ajaxForm({
        beforeSubmit: function (formData, jqForm, options) {
            if (av.validateForm() == false) {
                return false;
            } else {
                // push the disabled username field onto the form data array //
                formData.push({ name: 'username', value: $('#user-tf').val() });
                return true;
            }
        },
        success: function (responseText, status, xhr, $form) {
            if (status == 'success') hc.onUpdateSuccess();
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

    $('#editjobopeningform').on('click','#editjobopeningformcancel', function () {
        $('#editjobopeningform').hide();
    });

    // setup the confirm window that displays when the user chooses to delete their account //
    $('.modal-confirm').modal({ show: false, keyboard: true, backdrop: true });
    $('.modal-confirm .modal-header h3').text('Delete Account');
    $('.modal-confirm .modal-body p').html('Are you sure you want to delete your account?');
    $('.modal-confirm .cancel').html('Cancel');
    $('.modal-confirm .submit').html('Delete').addClass('btn-danger');
})