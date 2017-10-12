function attemptSignIn(email, password){
			
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		console.log(error.code + error.message);
		
		var $errorMsgContainer = $('#errorMsgContainer');
		if( error.code == "auth/user-not-found" || error.code == "auth/wrong-password" ){
			$errorMsgContainer.text("Oooops, the email address and password combination doesn't seem to exist.");
		}
	});
}

function attemptCreateUser(email, password){
			
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		console.log(error.code + error.message);
		
		var $errorMsgContainer = $('#errorMsgContainer');
		if( error.code == "auth/weak-password" ){
			$errorMsgContainer.text('Please choose a stronger password. ' + error.message);
		}
		if( error.code == "auth/email-already-in-use" ){
			$errorMsgContainer.text('We arleady have an account for this email address on record.');
		}
	});
}

function signout(){
	firebase.auth().signOut();
}