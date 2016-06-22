function loadTmpl_LoggedInUser_Home(values){
	$.get('tmpl/logged-in-user_home.mst', function(template) {
		var rendered = Mustache.render(template, values);
		$('body').html(rendered);
	}); //TODO: handle $.get errors eg file not found 404
}

function loadTmpl_SignIn(email){
	$.get('tmpl/sign-in.mst', function(template) {
		var rendered = Mustache.render(template, {email: email});
		$('body').html(rendered);
	}); //TODO: handle $.get errors eg file not found 404
}

function loadTmpl_RegisterNewUser(){
	$.get('tmpl/register-new-user.mst', function(template) {
		var rendered = Mustache.render(template, {email: email});
		$('body').html(rendered);
	}); //TODO: handle $.get errors eg file not found 404
}