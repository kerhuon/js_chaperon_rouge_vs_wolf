// Classes
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
				];// valeurs possibles : vide, gentil, mechant, mur, couteau, hache, pistolet, fusil

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
		return "Ligne: "+this.ligne+" colone: ".this.colonne;
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
		this.eclairage = eclairage;
	},
	eclairerCases: function(){
		// Fonction qui met à jour la variable listPlateau 
		// ainsi que l'attribut this.eclairage
		// la fonction placerEclair permet ensuite de mettre à jour les classes
		//Trois cases du dessous
		for(var i = this.ligne ; i < (this.ligne + 3); i++){
			if (i===8) break;
			if (listPlateau[i+1][this.colonne]!='pierre'){
				this.eclairage[i+1][this.colonne] = 'ok';
				//console.log('dans le if');
				//console.log('this.eclairage = ['+(i+1)+']['+this.colonne+'] : '+this.eclairage[i+1][this.colonne]);
			}
			else break;
		}
		// Trois cases du dessus
		for(var i = this.ligne ; i > this.ligne - 3; i--){
			if (i===0) break;
			if (listPlateau[i-1][this.colonne]!='pierre'){
				this.eclairage[i-1][this.colonne] = 'ok';
			}
			else break;
		}
		// Trois cases à droite
		for(var i = this.colonne ; i < this.colonne + 3; i++){
			if (i===9) break;
			if (listPlateau[this.ligne][i+1]!='pierre'){
				this.eclairage[this.ligne][i+1] = 'ok';
			}
			else break;
		}
		// Trois cases à gauche
		for(var i = this.colonne ; i > this.colonne - 3; i--){
			if (i===0) break;
			if (listPlateau[this.ligne][i-1]!='pierre'){
				this.eclairage[this.ligne][i-1] = 'ok';
			}
			else break;
		}

		for (var l = 0; l<9; l++){
			for (var c = 0; c<10; c++){
				if (this.eclairage[l][c] === 'ok'){
					placerEclair(donnerIdFromLigneColonne(l, c));
				}
			}
		}
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
}
placerMechant = function(id){
	$(id).removeClass('ok').html('<p><img class="image-personnage" src="images/mechant.jpg" alt=""></p>');
}

placerMur = function(id){
	$(id).addClass('pierre');
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

/*******************************************  INITIALISER LE PLATEAU ************************************************/

// On renvoie un entier aléatoire entre une valeur min et une max (incluses)
getRandomIntInclusive = function(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
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

// fonction qui choisit aléatoirement une arme
// parmi couteau, hache, pistolet, fusil
choixArme = function(){
	return listArmes[getRandomIntInclusive(1, 3)]; //on exclut le couteau car c'est l'arme par défaut
}
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

console.log(listPlateau);
// affichage armes
for (var i=0; i<listPositionArmes.length; i++){
	identifiant = fabriquerIdFromNumeroDeCase(listPositionArmes[i][0]);
	placerArme(identifiant, listPositionArmes[i][1]);
}

// choix aléatoire de placement du gentil (moitié haute du plateau)
var gentil = Object.create(Joueur);
while(true){
	nombre = getRandomIntInclusive(1, 40);
	if (listPlateau[donnerLigneFmNombre(nombre)][donnerColonneFmNombre(nombre)] === 'vide'){	//si la case est vide
		gentil.initJoueur(donnerLigneFmNombre(nombre), donnerColonneFmNombre(nombre)); 			//constructeur pour gentil, this.ligne et this.colonne sont définis
		listPlateau[donnerLigneFmNombre(nombre)][donnerColonneFmNombre(nombre)] = 'gentil';		//on met à jour listPlateau
		placerGentil(fabriquerIdFromNumeroDeCase(nombre));
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
console.log(gentil.eclairage);


/**************************************************** Tests unitaires **************************************************/
$(document).ready(function(){

	$("#case28").click(function(){
		bougerJoueurById('#case27', '#case29', 'mechant');
		
	});

	$('.btn-treehouse').click(function(){
		restart();
	});

});
