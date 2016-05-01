// PROJET PLATEAU
/******************************************* Variables globales /*******************************************/
// var listPlateau, représente le contenu des 10x9 cases (10 lignes, 9 colonnes) du plateau
var listPlateau = [	['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
					['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
					['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
					['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
					['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
					['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
					['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
					['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
					['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
				];// valeurs possibles : vide, gentil, mechant, pierre, couteau, hache, pistolet, fusil

var eclairage = [	['nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok'],
					['nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok'],
					['nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok'],
					['nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok'],
					['nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok'],
					['nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok'],
					['nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok'],
					['nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok'],
					['nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok', 'nok'],
				];// nok cases interdites, ok cases autorisées qui s'éclairent au hover

var listArmes = ['couteau', 'hache', 'pistolet', 'fusil'];

var Position = {

	initPosition: function(ligne, colonne){
		this.ligne = ligne;
		this.colonne = colonne;
	},

	describePosition: function(){
		return "Ligne: "+this.ligne+" colonne: ".this.colonne;
	}

}

/******************************************* classe Joueur *******************************************/
var Joueur = {
	initJoueur: function(ligne, colonne){
		this.pointsDeVie = 100;
		this.pointsDAttaque = 20; //arme de base à la création
		this.bouclier = true;
		this.ligne = ligne; // 0 à 8 soit 9 lignes
		this.colonne = colonne; // 0 à 9 soit 10 lignes
		this.eclairage = eclairage; // tout à nok
	},

	initEclairage: function(){
		this.eclairage = eclairage; // tout à nok
	},

	eclairerCases: function(){
		// Fonction qui met à jour la variable listPlateau 
		// ainsi que l'attribut this.eclairage
		// la fonction placerEclair permet ensuite de mettre à jour les classes
		//Trois cases du dessous
		for(var i = this.ligne ; i < (this.ligne + 3); i++){
			if (i===8) break;
			if (listPlateau[i+1][this.colonne]!='pierre' && listPlateau[i+1][this.colonne]!='mechant' && listPlateau[i+1][this.colonne]!='gentil'){
				this.eclairage[i+1][this.colonne] = 'ok';
				//console.log('dans le if');
				//console.log('this.eclairage = ['+(i+1)+']['+this.colonne+'] : '+this.eclairage[i+1][this.colonne]);
			}
			else break;
		}
		// Trois cases du dessus
		for(var i = this.ligne ; i > this.ligne - 3; i--){
			if (i===0) break;
			if (listPlateau[i-1][this.colonne]!='pierre' && listPlateau[i-1][this.colonne]!='mechant' && listPlateau[i-1][this.colonne]!='gentil'){
				this.eclairage[i-1][this.colonne] = 'ok';
			}
			else break;
		}
		// Trois cases à droite
		for(var i = this.colonne ; i < this.colonne + 3; i++){
			if (i===9) break;
			if (listPlateau[this.ligne][i+1]!='pierre' && listPlateau[this.ligne][i+1]!='mechant' && listPlateau[this.ligne][i+1]!='gentil'){
				this.eclairage[this.ligne][i+1] = 'ok';
			}
			else break;
		}
		// Trois cases à gauche
		for(var i = this.colonne ; i > this.colonne - 3; i--){
			if (i===0) break;
			if (listPlateau[this.ligne][i-1]!='pierre' && listPlateau[this.ligne][i-1]!='mechant' && listPlateau[this.ligne][i-1]!='gentil'){
				this.eclairage[this.ligne][i-1] = 'ok';
			}
			else break;
		}
		// on attribue la classe ok aux cases concernées
		for (var l = 0; l<9; l++){
			for (var c = 0; c<10; c++){
				if (this.eclairage[l][c] === 'ok'){
					placerEclair(donnerIdFromLigneColonne(l, c));
				}
			}
		}
	},

	deplacerJoueur: function(){

	},

	pointsDeVie: function(){
	// Affiche le nombre de points de vie dans le badge
		$('#ptsdevie').text(this.pointsDeVie);
	},
	pointsDAttaque: function(){
	// Affiche le nombre de points d'attaque dans le badge
		$('#ptsdattaque').text(this.pointsDAttaque);
	},
	bouclier: function(){
	// Affiche l'état du bouclier, OUI s'il est actif, NON dans le cas contraire
		if (this.bouclier){
			$('#bouclieractif').text('OUI');
		}
		else {
			$('#bouclieractif').text('NON');
		}
		
	}

}


/***********************************************  FONCTIONS DE BASE *************************************************/

restart = function(){
	window.location.reload();
}

donnerIdFromLigneColonne = function(ligne, colonne){
	return '#case' + String(ligne*10+colonne+1);
}

fabriquerIdFromNumeroDeCase = function(nombre){
	return '#case'+String(nombre);
}

donnerLigneFmId = function(id){
	//TODO, s'appuie sur donnerLigneFmNombre
}

donnerColonneFmId = function(id){
	//TODO
}

donnerLigneFmNombre = function(nombre){
	if (nombre%10 === 0){
		return Math.floor(nombre/10) - 1;
	}
	else return Math.floor(nombre/10);
}
donnerColonneFmNombre = function(nombre){
	return nombre-10*donnerLigneFmNombre(nombre)-1;
}


//Fonction déplacer joueur

bougerJoueurById = function(id_initial, id_final, type_joueur){
	$(id_initial).html('');
	if(type_joueur==='gentil'){
		placerGentil(id_final);
	}
	else {
		placerMechant(id_final);
	}
	//TODO : ok et nok
	
}

placerGentil = function(id){
	$(id).removeClass('ok').html('<p><img class="image-personnage" src="images/gentil.jpg" alt=""></p>');
	//TODO mettre à jour la variable eclairage
}
placerMechant = function(id){
	$(id).removeClass('ok').html('<p><img class="image-personnage" src="images/mechant.jpg" alt=""></p>');
	//TODO mettre à jour la variable eclairage
}



placerCouteau = function(id){
	$(id).html('<p><img class="image-personnage" src="images/couteau.png" alt=""></p>');
}
placerHache = function(id){
	$(id).html('<p><img class="image-personnage" src="images/hache.png" alt=""></p>');
}
placerPistolet = function(id){
	$(id).html('<p><img class="image-personnage" src="images/pistolet.png" alt=""></p>');
}
placerFusil = function(id){
	$(id).html('<p><img class="image-personnage" src="images/fusil.png" alt=""></p>');
}
placerArme = function(id, arme){
	switch (arme){
		case 'couteau': placerCouteau(id); break;
		case 'hache': placerHache(id); break;
		case 'pistolet': placerPistolet(id); break;
		case 'fusil': placerFusil(id); break;
	}
}

//éclairer les cases - 3 cases à l'est, à l'ouest, au sud, au nord
// il faut gérer quand on est au bord ou quand il y a le mur
placerEclair = function(id){
	$(id).addClass('ok');
}
eteindreEclair = function(id){
	$(id).removeClass('ok').addClass('nok');
}

// fonction qui choisit aléatoirement une arme
// parmi couteau, hache, pistolet, fusil
choixArme = function(){
	return listArmes[getRandomIntInclusive(1, 3)]; //on exclut le couteau car c'est l'arme par défaut
}

// Function qui renvoie un entier aléatoire entre une valeur min et une max (incluses)
getRandomIntInclusive = function(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

deplacementValide = function(joueur, ligne_dest, colonne_dest){
	// retourne true si valeur ok de l'attribut eclairage
	if (joueur.eclairage[ligne_dest][colonne_dest] === "ok"){
		return true;
	}
}


// Fonction qui initialise le plateau, uniquement pierres et armes (donc pas les joueurs)
initialiserPlateau = function(){
	placerMur = function(id){
		$(id).addClass('pierre');
	}
	// choix aléatoire de 12 cases qui auront des pierres
	var listPositionPierres = [], nombre;
	for (var i=0; i<12; i++){
		nombre = getRandomIntInclusive(1, 90);
		listPositionPierres.push(nombre);
		listPlateau[donnerLigneFmNombre(nombre)][donnerColonneFmNombre(nombre)] = 'pierre';
	}
	// affichage des pierres
	var identifiant;
	for (var i=0; i<listPositionPierres.length; i++){
		identifiant = fabriquerIdFromNumeroDeCase(listPositionPierres[i]);
		placerMur(identifiant);
	}
	/*				==> TODO : regrouper dans une fonction unique, en incluant la fonction placerMur -------------------------*/

	// choix aléatoire de 5 cases qui auront des armes
	var listPositionArmes = [], arme;
	for (var i=0; i<5; i++){
		nombre = getRandomIntInclusive(1, 90);
		arme = choixArme();
		
		if (listPlateau[donnerLigneFmNombre(nombre)][donnerColonneFmNombre(nombre)] === 'vide'){
			listPositionArmes.push([nombre, arme]);
			listPlateau[donnerLigneFmNombre(nombre)][donnerColonneFmNombre(nombre)] = arme;
		}
		else i--; //si une case n'est pas vide, on refait un tour
	}
	console.log("----------------------------")
	console.log("listPLATEAU :")
	console.log(listPlateau);
	// affichage armes
	for (var i=0; i<listPositionArmes.length; i++){
		identifiant = fabriquerIdFromNumeroDeCase(listPositionArmes[i][0]);
		placerArme(identifiant, listPositionArmes[i][1]);
	}
	/*				==> TODO : regrouper dans une fonction unique  -------------------------*/
}
/*******************************************  INITIALISER LE PLATEAU ************************************************/
initialiserPlateau();

/*******************************************  PLACEMENT DES JOUEURS ************************************************/
// choix aléatoire de placement du gentil (moitié haute du plateau)
var gentil = Object.create(Joueur);  // création de l'objet gentil, sans appel au constructeur pour l'instant
while(true){
	nombre = getRandomIntInclusive(1, 40);
	if (listPlateau[donnerLigneFmNombre(nombre)][donnerColonneFmNombre(nombre)] === 'vide'){	//si la case est vide
		gentil.initJoueur(donnerLigneFmNombre(nombre), donnerColonneFmNombre(nombre)); 			//constructeur pour gentil, this.ligne et this.colonne sont définis
		listPlateau[donnerLigneFmNombre(nombre)][donnerColonneFmNombre(nombre)] = 'gentil';		//on met à jour la variable globale listPlateau
		placerGentil(fabriquerIdFromNumeroDeCase(nombre));										// affichage
		break;
	}
}

// choix aléatoire de placement du méchant (moitié basse du plateau)
var mechant = Object.create(Joueur);
while(true){
	nombre = getRandomIntInclusive(60, 90);
	if (listPlateau[donnerLigneFmNombre(nombre)][donnerColonneFmNombre(nombre)] === 'vide'){	//si la case est vide
		mechant.initJoueur(donnerLigneFmNombre(nombre), donnerColonneFmNombre(nombre)); 			//constructeur pour mechant, this.ligne et this.colonne sont définis
		listPlateau[donnerLigneFmNombre(nombre)][donnerColonneFmNombre(nombre)] = 'mechant';		//on met à jour listPlateau
		placerMechant(fabriquerIdFromNumeroDeCase(nombre));
		break;
	}
}



// Eclairage des cases pour gentil
gentil.eclairerCases();
console.log("----------------------------")
console.log("gentil.eclairage")
console.log(gentil.eclairage);
console.log("----------------------------")
console.log("mechant.eclairage")
console.log(mechant.eclairage);
console.log("----------------------------")


/**************************************************** Tests unitaires **************************************************/
$(document).ready(function(){

	$("#case28").click(function(){
		bougerJoueurById('#case27', '#case29', 'mechant');
		
	});

	$('#restart').click(function(){
		restart();
	});

});
/**************************************************** Gestion des évènements **************************************************/
var reply_click = function()
{
    console.log(this.id);
    
};

for (var i = 1;i<=90;i++){
  document.getElementById('case'+i).onclick = reply_click;
}





// chaque joueur joue son tour
// seul le joueur actif peut se déplacer, l'éclairage ne vaut que pour le joueur en cours

// GESTION DU DEPLACEMENT

