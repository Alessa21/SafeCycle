var controls = (function($){
	
	var panel = document.getElementById('control-panel');
	panel.addEventListener("click", function(){
		//console.log('Seems to be in order.');		//DEBUG
		tapControlPanel();
	});
	
	function tapControlPanel(){
		// Toggle transform by adding or removing cp=-item-clicked as appropriate
		$(".cp-item").toggleClass("cp-item-clicked");
		changePanelIcon();
	}
	
	// Change control panel icon on click
	var sources = ['location_crop.png', 'marker_crop.png'];
	var changePanelIcon = function(){
		var icon = document.getElementById('cp-icon');
		var currentSrc = icon.src.split('/');
		currentSrc = (currentSrc[currentSrc.length-1]);
		var currentIndex = (sources.indexOf(currentSrc));
		var newIndex = currentIndex < sources.length-1 ? currentIndex+1 : 0;
		//console.log(newIndex);	//DEBUG
		icon.src = "assets/images/" + sources[newIndex]; 
	}
	
	// TODO: function to reset menu item images rotation to zero after animation
	var resetImageRotations = function(){
		
	}
	
	// Add listeners to menu items
	var items = document.getElementsByClassName('cp-item');
	for (var i=0;i<items.length;i++){
		items[i].addEventListener("click", function(){
			//console.log(this.id);		//DEBUG
			map.addMarker(this.id);
		});
	}

}(jQuery));