// Classes
var Position = {

	initPosition: function(ligne, colonne){
		this.ligne = ligne;
		this.colonne = colonne;
	},

	describePosition: function(){
		return "Ligne: "+this.ligne+" colone: ".this.colonne;
	},

	donneId: function(){
		return 'case' + String(this.ligne*10+this.colonne+1);
	}

}





//Fonction déplacer joueur
moveJoueur = function(position_initiale, position_finale, type_joueur){
	var id_initial = position_initiale.donneId();
	var id_final = position_finale.donneId();
	$(id_initial).html('');
	if(type==='gentil'){
		$(id_final).html('<img class="image-personnage" src="images/gentil.jpg" alt="Gentil">');
	}
	else {
		$(id_final).html('<img class="image-personnage" src="images/mechant.jpg" alt="Mechant">');
	}
	
}

positionToId = function(position){
	return String(position.ligne*10+position.colonne+1);

}



/* Tests unitaires */
