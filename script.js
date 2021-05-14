/* https://youtu.be/4kRqai4ZbHA */
/* https://www.youtube.com/watch?v=88qRmxhqoBA */
/* https://youtu.be/PBOpSZja-1A */
/* https://youtu.be/q_uze6Jnv6M */
/* https://youtu.be/TgOm3ewdXcc */

/* jQuery */
var $ = window.jQuery;

/* Requêtes API */
var getAPI = function ( url ) {
    return new Promise( function ( resolution, rejet ) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // Si la requête est terminée et que la réponse est reçue
            if ( xhr.readyState === 4 ) {
                // S'il n'y a pas d'erreurs
                if ( xhr.status === 200 ) {
                    resolution( xhr.responseText );
                } else {
                    rejet( xhr );
                }
            }
        };
        xhr.open( "GET", url, true );
        xhr.send( null );
    } );
};

/* Jouer sons (permet de jouer plusieurs son à la fois) */
/* https://jsfiddle.net/pknsg809/2/ */
function play_F( file ) {
    var audio = document.createElement( 'audio' );
    audio.src = file;
    document.body.appendChild( audio );
    audio.play();

    audio.onended = function () {
        this.parentNode.removeChild( this );
    }
}

/* VueJS */
var app = new Vue( {
    el: '.pokedex',
    data: {
        etat: 'eteint',
        menu: [
            "Tous les pokémons", "Pokémons par type", "Pokémons favoris", "Liste des baies"
        ],
        menu_actif: 0,
        menu_pokemon: {
            pokemons: [],
            menu_actif: 0,
            page_active: 0,
            nombre_max: 0,
            page_prec: null,
            page_suiv: null,
            pokemons_type: null,
            pokemons_liste: null
        },
        pokemon: {
            nom: null,
            image: null,
            stats: null,
            types: null
        },
        ecran_secondaire: '',
        ecran_gauche: '',
        ecran_droit: '',
        ecran_vert: ''
    },
    methods: {
        majPokemons() {
            /* Mettre l'écran en chargement en attendant de revevoir le retour de l'API */
            let save_etat = this.etat;
            this.etat = 'chargement';

            /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction annonyme ) */
            getAPI( 'https://pokeapi.co/api/v2/pokemon?limit=4&offset=' + ( this.menu_pokemon.page_active * 4 ) ).then( ( reponse ) => {
                let reponse_json = JSON.parse( reponse );

                /* Récupération des valeurs */
                this.menu_pokemon.pokemons = reponse_json.results;
                this.menu_pokemon.page_prec = reponse_json.previous;
                this.menu_pokemon.page_suiv = reponse_json.next;
                this.menu_pokemon.nombre_max = reponse_json.count;
                /* Arrêter le chargement */
                this.etat = save_etat;
            } );
        },
        getPokemon() {
            /* Mettre l'écran en chargement en attendant de revevoir le retour de l'API */
            let save_etat = this.etat;
            this.etat = 'chargement';

            let nom_pokemon_courant = this.menu_pokemon.pokemons[ this.menu_pokemon.menu_actif ].name;
            /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction annonyme ) */
            getAPI( 'https://pokeapi.co/api/v2/pokemon/' + nom_pokemon_courant ).then( ( reponse ) => {
                let reponse_json = JSON.parse( reponse );

                /* Récupération des valeurs */
                this.pokemon.nom = reponse_json.name;
                this.pokemon.image = reponse_json.sprites.other[ 'official-artwork' ].front_default;
                this.pokemon.stats = reponse_json.stats;
                this.pokemon.types = reponse_json.types;

                /* Arrêter le chargement */
                this.etat = save_etat;
            } );
        },
        ouverture() {
            if ( !$( ".pokedex" ).hasClass( "ouvert" ) && !$( ".pokedex" ).hasClass( "bouge" ) ) {
                this.etat = 'demarrage';
                $( ".pokedex" ).addClass( "bouge" )
                /* Son */
                play_F( 'sons/boot.mp3' );
                /* Lumières */
                setTimeout( function () {
                    $( ".led-rouge" ).addClass( 'allume' );
                }, 2700 );
                setTimeout( function () {
                    $( ".led-bleue" ).addClass( 'allume' );
                }, 5500 );
                /* Mouvement */
                /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction ) */
                setTimeout( () => {
                    this.etat = 'menu';
                    /* Allumer le Pokedex */
                    $( ".pokedex" ).addClass( "allume" );
                    $( '.pokedex' ).removeClass( "bouge" );
                }, 5500 );
                $( '.pokedex' ).addClass( "ouvert" );
            }
        },
        fermeture() {
            if ( $( ".pokedex" ).hasClass( "ouvert" ) && $( ".pokedex" ).hasClass( "allume" ) && !$( ".pokedex" ).hasClass( "bouge" ) ) {
                this.etat = 'extinction';
                $( ".pokedex" ).removeClass( "ouvert" );
                $( ".pokedex" ).addClass( "bouge" )
                /* Lumières */
                setTimeout( function () {
                    $( ".led-rouge" ).removeClass( 'allume' );
                }, 0 );
                setTimeout( function () {
                    $( ".led-bleue" ).removeClass( 'allume' );
                }, 500 );
                /* Son et mouvements */
                /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction ) */
                setTimeout( () => {
                    this.etat = 'eteint';
                    play_F( 'sons/extinction.mp3' );
                    $( ".pokedex" ).removeClass( "allume" );
                    $( ".pokedex" ).removeClass( "bouge" );
                }, 500 );
            }
        },
        /* Pression sur le bouton power */
        power() {
            if ( $( ".pokedex" ).hasClass( "ouvert" ) && $( ".pokedex" ).hasClass( "allume" ) && !$( ".pokedex" ).hasClass( "bouge" ) ) {
                /* Si le Pokédex est ouvert et allumé */
                this.etat = 'extinction';
                $( ".pokedex" ).addClass( "bouge" )
                /* Lumières */
                setTimeout( function () {
                    $( ".led-rouge" ).removeClass( 'allume' );
                }, 0 );
                setTimeout( function () {
                    $( ".led-bleue" ).removeClass( 'allume' );
                }, 500 );
                /* Son et mouvements */
                /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction ) */
                setTimeout( () => {
                    this.etat = 'eteint';
                    play_F( 'sons/extinction.mp3' );
                    $( ".pokedex" ).removeClass( "allume" );
                    $( ".pokedex" ).removeClass( "bouge" );
                }, 500 );

            } else if ( $( ".pokedex" ).hasClass( "ouvert" ) && !$( ".pokedex" ).hasClass( "allume" ) && !$( ".pokedex" ).hasClass( "bouge" ) ) {
                /* Si le Pokédex est ouvert et éteint */
                this.etat = 'demarrage';
                $( ".pokedex" ).addClass( "bouge" )
                /* Son */
                play_F( 'sons/boot.mp3' );
                /* Lumières */
                setTimeout( function () {
                    $( ".led-rouge" ).addClass( 'allume' );
                }, 2700 );
                setTimeout( function () {
                    $( ".led-bleue" ).addClass( 'allume' );
                }, 5500 );
                /* Mouvement */
                /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction ) */
                setTimeout( () => {
                    this.etat = 'menu';
                    /* Allumer le Pokedex */
                    $( ".pokedex" ).addClass( "allume" );
                    $( '.pokedex' ).removeClass( "bouge" );
                }, 5500 );
            }
        },
        pression( touche ) {
            /* Ne rien faire si le Pokédex est éteint */
            if ( $( ".pokedex" ).hasClass( "allume" ) ) {
                if ( touche == 'ok' ) {
                    /* OK */
                    /* Si on est sur le menu principal */
                    if ( this.etat == 'menu' ) {
                        if ( this.menu_actif == '0' ) {
                            /* Tous les pokémons */
                            this.etat = 'pokemons';
                            this.majPokemons();
                        } else if ( this.menu_actif == '1' ) {
                            /* Type */
                        } else if ( this.menu_actif == '2' ) {
                            /* Favoris */
                        } else if ( this.menu_actif == '3' ) {
                            /* Baies */
                        }
                        play_F( 'sons/bip.mp3' );
                    } else if ( this.etat == 'pokemons' ) {
                        this.etat = 'pokemon';
                        this.getPokemon();
                        play_F( 'sons/bip.mp3' );
                        play_F( 'sons/voix.mp3' );
                    } else if ( this.etat == 'pokemon' ) {
                        play_F( 'sons/probleme.mp3' );
                    }

                } else if ( touche == 'retour' ) {
                    /* RETOUR */
                    /* Si on est sur le menu principal */
                    if ( this.etat == 'menu' ) {
                        play_F( 'sons/probleme.mp3' );
                    } else if ( this.etat == 'pokemons' ) {
                        this.etat = 'menu';
                        play_F( 'sons/bip.mp3' );
                    } else if ( this.etat == 'pokemon' ) {
                        this.etat = 'pokemons';
                        play_F( 'sons/bip.mp3' );
                    }

                } else {
                    play_F( 'sons/bip.mp3' );
                }
            }
        },
        pression_joystick( sens ) {

            if ( sens === 'top' ) {
                /* HAUT */
                /* Rien ne marche pas si le Pokédex est éteint */
                if ( $( ".pokedex" ).hasClass( "allume" ) ) {
                    if ( this.etat == 'menu' ) {

                        if ( this.menu_actif > 0 ) {
                            play_F( 'sons/pch.mp3' );
                            this.menu_actif--;
                        } else {
                            play_F( 'sons/probleme.mp3' );
                        }

                    } else if ( this.etat == 'pokemons' ) {

                        if ( this.menu_pokemon.menu_actif > 0 ) {
                            play_F( 'sons/pch.mp3' );
                            this.menu_pokemon.menu_actif--;
                        } else {
                            /* Changement de page si possible */
                            if ( this.menu_pokemon.page_prec != null ) {
                                play_F( 'sons/pch.mp3' );
                                this.menu_pokemon.page_active--;
                                this.majPokemons();
                                this.menu_pokemon.menu_actif = 3;
                            } else {
                                play_F( 'sons/probleme.mp3' );
                            }
                        }
                    }
                }
                $( ".joystick" ).addClass( 'joystick-angle-top' );

            } else if ( sens === 'bottom' ) {
                /* BAS */
                /* Rien ne marche pas si le Pokédex est éteint */
                if ( $( ".pokedex" ).hasClass( "allume" ) ) {

                    if ( this.etat == 'menu' ) {
                        if ( this.menu_actif < 3 ) {
                            play_F( 'sons/pch.mp3' );
                            this.menu_actif++;
                        } else {
                            play_F( 'sons/probleme.mp3' );
                        }
                    } else if ( this.etat == 'pokemons' ) {

                        if ( this.menu_pokemon.menu_actif < 3 ) {
                            play_F( 'sons/pch.mp3' );
                            this.menu_pokemon.menu_actif++;
                        } else {
                            /* Changement de page si possible */
                            if ( this.menu_pokemon.page_suiv != null ) {
                                play_F( 'sons/pch.mp3' );
                                this.menu_pokemon.page_active++;
                                this.majPokemons();
                                this.menu_pokemon.menu_actif = 0;
                            } else {
                                play_F( 'sons/probleme.mp3' );
                            }
                        }
                    }
                }
                $( ".joystick" ).addClass( 'joystick-angle-bottom' );

            } else if ( sens === 'left' ) {
                /* GAUCHE */
                /* Rien ne marche pas si le Pokédex est éteint */
                if ( $( ".pokedex" ).hasClass( "allume" ) ) {
                    play_F( 'sons/probleme.mp3' );
                }
                $( ".joystick" ).addClass( 'joystick-angle-left' );
            } else if ( sens === 'right' ) {
                /* DROITE */
                /* Rien ne marche pas si le Pokédex est éteint */
                if ( $( ".pokedex" ).hasClass( "allume" ) ) {
                    play_F( 'sons/probleme.mp3' );
                }
                $( ".joystick" ).addClass( 'joystick-angle-right' );
            } else {
                /* Relachement ou sortie de bouton */
                $( ".joystick" ).removeClass( 'joystick-angle-top' );
                $( ".joystick" ).removeClass( 'joystick-angle-bottom' );
                $( ".joystick" ).removeClass( 'joystick-angle-left' );
                $( ".joystick" ).removeClass( 'joystick-angle-right' );
            }
        }
    }
} );
