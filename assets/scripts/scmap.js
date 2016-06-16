var map = (function(){
	// Create reference to Firebase DB
	var db = new Firebase("https://glaring-inferno-4148.firebaseio.com/");
	// Create map variable at highest level of component
	var map;
	//db.set({test: 'test'});	//DEBUG	
	
	function initialize () {
		var lat;
		var lng;
		//$('body').load("assets/templates/marker_template.html");
		
		// Get user's permission to use location
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getPosition, error, {enableHighAccuracy:true});
		} 
		else {
			y.innerHTML = "Geolocation is not supported by this browser.";
		}
		
		// Create map and centre on user's location
		function getPosition (position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			//alert (lat +' , '+ lng);			//DEBUG
			var center = new google.maps.LatLng(lat,lng);
			// Collect all output nodes - one for large-screen, one for small-screen
			var mapCanvas = document.getElementsByClassName("map-canvas");
			//alert (mapCanvas.length);			//DEBUG
			// Set map center and starting zoom level
			var mapOptions = {
				center: center,
				zoom: 17,
				disableDefaultUI: true
				};
				
			for (i=0;i<mapCanvas.length;i++) {
				// Create new map
				map = new google.maps.Map(mapCanvas[i],mapOptions);
				populateMarkers();
				//alert (i);					//DEBUG
				}
				
			//DEBUG - function should fire on tap of menu item rather than tapping on map
			map.addListener("click", function(e){
				addMarkerOnClick();
			});
		}
			
		function accidentMarker(color){
			var content = "<div class='marker-div'><img src='assets/images/sc-" + color +".png'></img><div class='icon-div'></div></div>";
			return content;
		}
			
		// Read marker details from DB and populate map
		function populateMarkers(){
			var markers = new Firebase("https://glaring-inferno-4148.firebaseio.com/markers");
			markers.once("value", function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
					var marker = childSnapshot.val().marker;
					//console.log(marker); 	//DEBUG
					var latLng = new google.maps.LatLng(marker.lastLocLat, marker.lastLocLng);
					//console.log(latLng);	//DEBUG
					var content = accidentMarker('red');
					//console.log(content);	//DEBUG
 					var mapMarker = new RichMarker({
						position: latLng,
						map: map,
						shadow: 'none',
						content: content
					});
				});
			});
		}
		
	}
	
	function error () {
		//alert ("Location unavailable, sorry!");
	}		
	
	// Wait until page has finished loading before function triggers
	google.maps.event.addDomListener(window, 'load', initialize);
	
	//add marker to map on click
	var addMarkerOnClick = function(){
		var selectedLoc = {};
		selectedLoc.lat = map.getCenter().lat();
		selectedLoc.lng = map.getCenter().lng();
		console.log(selectedLoc);	//DEBUG

		var marker = new google.maps.Marker({
		position: selectedLoc,
		map: map,
		size: new google.maps.Size(200, 320)
		});
		//console.log(marker);	//DEBUG
		logMarker(selectedLoc);
	}
	
	//log marker details to DB
	function logMarker(loc){
		db.child('markers').push({
			marker:{
				lastLocLat: loc.lat, 
				lastLocLng: loc.lng
				}
			});
	}	
	
	//var testVar = "Can you see me?";
	return {addMarker: addMarkerOnClick};
}());
