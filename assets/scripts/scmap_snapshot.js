var map = (function(){
	// Create reference to Firebase DB
	var db = new Firebase("https://glaring-inferno-4148.firebaseio.com/");
	// Create map variable at highest level of component
	var map;
	//db.set({test: 'test'});	//DEBUG	
	
	// Array of marker references - needed for updating without refresh
	var markerList = [];
	
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
			// map.addListener("click", function(e){
				// addMarkerOnClick();
			// });
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
					var content = accidentMarker('red', marker.type);
					//console.log(content);	//DEBUG
 					var mapMarker = new RichMarker({
						position: latLng,
						map: map,
						shadow: 'none',
						content: content,
						draggable: true
					});
					mapMarker.addListener('dragend', function(){
						updateOnDrag(this);
					});
					markerList.push(mapMarker);
				});
			});
		}
		
	}
	
	function error () {
		//alert ("Location unavailable, sorry!");
	}		
	
	// Wait until page has finished loading before function triggers
	google.maps.event.addDomListener(window, 'load', initialize);
	
	
	// Fill in template with marker-specific info and return content
	var accidentMarker = function(color, type){
		var iconSources = {
			car: 'car_crop',
			person: 'person_crop',
			bike: 'bike_crop',
			motorbike: 'motorbike_crop',
			bus: 'bus_crop',
			tram: 'tram_crop'
		};
		var icon = iconSources[type];
		var content = "<div onclick = 'console.log(this)' class='marker-div'><img src='assets/images/sc-" + color +".png' /><div class='icon-div'><img src='assets/images/" + icon + ".png' /></div></div>";
		return content;
	}
	
	// update marker's position field in Firebase DB after drag event
	var updateOnDrag = function(t){
		console.log(t.position.lat() + ', ' + t.position.lng())
	}
	
	// add marker to map - split into function to avoid repeating code between initial map load and adding marker on click
	var placeMarker = function(){
		
	}
	
	//add marker to map on click
	var addMarkerOnClick = function(type){
		var selectedLoc = {};
		selectedLoc.lat = map.getCenter().lat();
		selectedLoc.lng = map.getCenter().lng();
		console.log(selectedLoc);	//DEBUG

		var latLng = new google.maps.LatLng(selectedLoc.lat, selectedLoc.lng);
		var content = accidentMarker('red', type);
		var mapMarker = new RichMarker({
			position: latLng,
			map: map,
			shadow: 'none',
			content: content
		});
		markerList.push(mapMarker);
		//console.log(marker);	//DEBUG
		logMarker(selectedLoc, type);
		
	}
	
	//log marker details to DB
	function logMarker(loc, type){
		var commit = db.child('markers').push({
			marker:{
				lastLocLat: loc.lat, 
				lastLocLng: loc.lng,
				type: type
				}
			});
		console.log(commit.key())
	}	
	
	//var testVar = "Can you see me?";
	return {addMarker: addMarkerOnClick,
			accidentMarker: accidentMarker,
			markers: markerList
			};
}());

