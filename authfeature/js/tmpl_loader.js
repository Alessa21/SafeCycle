function loadTmpl_LoggedInUser_Home(values){
	$('body').html('');
	$.get('tmpl/map.mst', function(template) {
		var rendered = Mustache.render(template);
		$('body').append(rendered);
	}); //TODO: handle $.get errors eg file not found 404
	$.get('tmpl/logged-in-user_home.mst', function(template) {
		var rendered = Mustache.render(template, values);
		$('body').append(rendered);
	}); //TODO: handle $.get errors eg file not found 404
}

function loadTmpl_SignIn(email){
	$('body').html('');
	$.get('tmpl/map.mst', function(template) {
		var rendered = Mustache.render(template);
		$('body').append(rendered);
	}); //TODO: handle $.get errors eg file not found 404
	$.get('tmpl/sign-in.mst', function(template) {
		var rendered = Mustache.render(template, {email: email});
		$('body').append(rendered);
	}); //TODO: handle $.get errors eg file not found 404
}

function loadTmpl_RegisterNewUser(){
	$('body').html('');
	$.get('tmpl/map.mst', function(template) {
		var rendered = Mustache.render(template);
		$('body').append(rendered);
	}); //TODO: handle $.get errors eg file not found 404
	$.get('tmpl/register-new-user.mst', function(template) {
		var rendered = Mustache.render(template);
		$('body').append(rendered);
	}); //TODO: handle $.get errors eg file not found 404
}