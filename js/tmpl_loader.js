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


function loadTmpl_AnonNav(){
	$('body').html('');
	$.get('tmpl/map.mst', function(template) {
		var rendered = Mustache.render(template);
		$('body').append(rendered);
	}); //TODO: handle $.get errors eg file not found 404
	$.get('tmpl/anon_nav.mst', function(template) {
		var rendered = Mustache.render(template);
		$('body').append(rendered);
	}); //TODO: handle $.get errors eg file not found 404
	$.get('tmpl/add-marker-controls.mst', function(template) {
		var rendered = Mustache.render(template);
		$('body').append(rendered);
	}); //TODO: handle $.get errors eg file not found 404
}