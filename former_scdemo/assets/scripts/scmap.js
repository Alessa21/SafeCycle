var map = (function($){
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
		
		// Prevent screen from being dragged down on iOS device
		document.body.addEventListener('touchmove', function (ev) { 
			ev.preventDefault();
		});
		
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
			// specify location where map will be displayed
			var mapCanvas = document.getElementById("map-canvas-smallscreen");
			//alert (mapCanvas.length);			//DEBUG
			// Set map center and starting zoom level
			var mapOptions = {
				center: center,
				zoom: 17,
				disableDefaultUI: true,
				disableDoubleClickZoom: true
				};
				
			map = new google.maps.Map(mapCanvas,mapOptions);
			populateMarkers();

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
					var markerID = childSnapshot.key();
					var latLng = new google.maps.LatLng(marker.lastLocLat, marker.lastLocLng);
					//console.log(latLng);	//DEBUG
					var content = accidentMarker('red', marker.type, markerID);
					//console.log(content);	//DEBUG
 					placeMarker(content, latLng);
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
	var accidentMarker = function(color, type, id){
		id = id || ' ';
		var iconSources = {
			car: 'car_crop',
			person: 'person_crop',
			bike: 'bike_crop',
			motorbike: 'motorbike_crop',
			bus: 'bus_crop',
			tram: 'tram_crop'
		};
		var icon = iconSources[type];
		var content = "<div class='marker-div' id ='" + id + "'><img src='assets/images/sc-" + color +".png' /><div class='icon-div'><img src='assets/images/" + icon + ".png' /></div></div>";
		return content;
	}
	
	// update marker's position field in Firebase DB after drag event
	var updateOnDrag = function(t){
		console.log(t.position.lat() + ', ' + t.position.lng())
	}
	
	// add marker to map - split into function to avoid repeating code between initial map load and adding marker on click
	var placeMarker = function(content, latLng){
		var mapMarker = new RichMarker({
						position: latLng,
						map: map,
						shadow: 'none',
						content: content,
						draggable: true
		});
		google.maps.event.addListener(mapMarker, 'dragend', function(ev) {
			console.log(ev);
			updateOnDrag(this);		
		});
		google.maps.event.addListener(mapMarker, 'click', function(ev) {
			// Hacky solution to click firing twice in Google Maps API v3: logic only fires on trusted click
			if(ev.isTrusted){
				ev.preventDefault();
				ev.stopPropagation();
				console.log(this);	
			}
		});
		markerList.push(mapMarker);
	}
	
	//add marker to map on click
	var addMarkerOnClick = function(type){
		var selectedLoc = {};
		selectedLoc.lat = map.getCenter().lat();
		selectedLoc.lng = map.getCenter().lng();
		console.log(selectedLoc);	//DEBUG

		var latLng = new google.maps.LatLng(selectedLoc.lat, selectedLoc.lng);
		// Log marker and store commit key to use in GUI
		var markerId = logMarker(selectedLoc, type);
		//console.log(markerId);	//DEBUG
		var content = accidentMarker('red', type, markerId);
		placeMarker(content, latLng);
	}
	
	//log marker details to DB, returns key used in commit
	function logMarker(loc, type){
		var commit = db.child('markers').push({
			marker:{
				lastLocLat: loc.lat, 
				lastLocLng: loc.lng,
				type: type
				}
			});
		return(commit.key());
	}	
	
	//var testVar = "Can you see me?";
	return {addMarker: addMarkerOnClick,
			accidentMarker: accidentMarker,
			markers: markerList
			};
}(jQuery));

