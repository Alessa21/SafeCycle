$('#register-form').submit(function(event){
    // cancels the form submission
    event.preventDefault();

    attemptCreateUser($('#email').val(), $('#password').val());
});

$('#sign-in-form').submit(function(event){
    // cancels the form submission
    event.preventDefault();

    attemptSignIn($('#email').val(), $('#password').val());
});

function close_overlay(){
    $('#register-container').css("display", "none");
    $('#sign-in-container').css("display", "none");
};


function loadTmpl_SignIn(){
	$('#register-container').css("display", "none");
	$('#sign-in-container').css("display", "flex");
}

function loadTmpl_RegisterNewUser(){
	$('#sign-in-container').css("display", "none");
	$('#register-container').css("display", "flex");
}