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
            "Pokémons", "Types", "Pokémons favoris", "Baies"
        ],
        menu_actif: 0,
        menu_pokemon: {
            pokemons: [],
            menu_actif: 0,
            page_active: 0,
            nombre_max: 0,
            page_prec: null,
            page_suiv: null
        },
        pokemon: {
            nom: null,
            image: null,
            stats: null,
            types: null
        },
        baie: {
            nom: null
        },
        type: {
            nom: null
        },
        menu_baies: {
            baies: [],
            menu_actif: 0,
            page_active: 0,
            nombre_max: 0,
            page_prec: null,
            page_suiv: null
        },
        menu_types: {
            types: [],
            menu_actif: 0,
            page_active: 0,
            page_prec: null,
            page_suiv: null
        },
        menu_favoris: {
            pokemons: [],
            menu_actif: 0,
            page_active: 0,
            nombre_max: 0,
            page_prec: null,
            page_suiv: null
        },
        ecran_secondaire: '',
        ecran_gauche: '',
        ecran_droit: '',
        ecran_vert: ''
    },
    methods: {
        camera( sens ) {
            if ( sens == "gauche" ) {
                $( ".pokedex" ).removeClass( "ouvert-droite" );
                $( ".pokedex" ).addClass( "ouvert-gauche" );
            } else if ( sens == "droite" ) {
                $( ".pokedex" ).removeClass( "ouvert-gauche" );
                $( ".pokedex" ).addClass( "ouvert-droite" );
            } else {
                $( ".pokedex" ).removeClass( "ouvert-gauche" );
                $( ".pokedex" ).removeClass( "ouvert-droite" );
            }
        },
        getTypes() {
            /* Mettre l'écran en chargement en attendant de revevoir le retour de l'API */
            let save_etat = this.etat;
            this.etat = 'chargement';
            /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction annonyme ) */
            getAPI( 'https://pokeapi.co/api/v2/type?limit=4&offset=' + ( this.menu_types.page_active * 4 ) ).then( ( reponse ) => {
                let reponse_json = JSON.parse( reponse );
                /* Récupération des valeurs */
                this.menu_types.types = reponse_json.results;
                this.menu_types.page_prec = reponse_json.previous;
                this.menu_types.page_suiv = reponse_json.next;
                this.menu_types.nombre_max = reponse_json.count;
                /* Arrêter le chargement */
                this.etat = save_etat;
            } );
        },
        getType() {
            /* Mettre l'écran en chargement en attendant de revevoir le retour de l'API */
            let save_etat = this.etat;
            this.etat = 'chargement';
            let nom_type_courant = this.menu_types.types[ this.menu_types.menu_actif ].name;
            /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction annonyme ) */
            getAPI( 'https://pokeapi.co/api/v2/type/' + nom_type_courant ).then( ( reponse ) => {
                let reponse_json = JSON.parse( reponse );
                /* Récupération des valeurs */
                this.type.nom = reponse_json.name;
                /* Arrêter le chargement */
                this.etat = save_etat;
            } );
        },
        getPokemons() {
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
        getBaies() {
            /* Mettre l'écran en chargement en attendant de revevoir le retour de l'API */
            let save_etat = this.etat;
            this.etat = 'chargement';
            /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction annonyme ) */
            getAPI( 'https://pokeapi.co/api/v2/berry?limit=4&offset=' + ( this.menu_baies.page_active * 4 ) ).then( ( reponse ) => {
                let reponse_json = JSON.parse( reponse );
                /* Récupération des valeurs */
                this.menu_baies.baies = reponse_json.results;
                this.menu_baies.page_prec = reponse_json.previous;
                this.menu_baies.page_suiv = reponse_json.next;
                this.menu_baies.nombre_max = reponse_json.count;
                /* Arrêter le chargement */
                this.etat = save_etat;
            } );
        },
        getBaie() {
            /* Mettre l'écran en chargement en attendant de revevoir le retour de l'API */
            let save_etat = this.etat;
            this.etat = 'chargement';
            let nom_baie_courante = this.menu_baies.baies[ this.menu_baies.menu_actif ].name;
            /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction annonyme ) */
            getAPI( 'https://pokeapi.co/api/v2/berry/' + nom_baie_courante ).then( ( reponse ) => {
                let reponse_json = JSON.parse( reponse );
                /* Récupération des valeurs */
                this.baie.nom = reponse_json.name;
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

                this.camera( 'reset' );

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
                            this.getPokemons();
                        } else if ( this.menu_actif == '1' ) {
                            /* Type */
                            this.etat = 'types';
                            this.getTypes();
                        } else if ( this.menu_actif == '2' ) {
                            /* Favoris */
                            this.etat = 'favoris';

                        } else if ( this.menu_actif == '3' ) {
                            /* Baies */
                            this.etat = 'baies';
                            this.getBaies();
                        }
                        play_F( 'sons/bip.mp3' );
                    } else if ( this.etat == 'pokemons' ) {
                        this.etat = 'pokemon';
                        this.getPokemon();
                        play_F( 'sons/bip.mp3' );
                    } else if ( this.etat == 'pokemon' ) {
                        play_F( 'sons/probleme.mp3' );

                    } else if ( this.etat == 'types' ) {
                        this.etat = 'type';
                        this.getType();
                        play_F( 'sons/bip.mp3' );
                    } else if ( this.etat == 'type' ) {
                        play_F( 'sons/probleme.mp3' );

                    } else if ( this.etat == 'baies' ) {
                        this.etat = 'baie';
                        this.getBaie();
                        play_F( 'sons/bip.mp3' );
                    } else if ( this.etat == 'baie' ) {
                        play_F( 'sons/probleme.mp3' );
                    }

                } else if ( touche == 'retour' ) {
                    /* RETOUR */
                    /* Si on est sur le menu principal */
                    if ( this.etat == 'menu' ) {
                        play_F( 'sons/probleme.mp3' );
                    } else if ( this.etat == 'pokemons' || this.etat == 'types' || this.etat == 'favoris' || this.etat == 'baies' ) {
                        this.etat = 'menu';
                        play_F( 'sons/bip.mp3' );
                    } else if ( this.etat == 'pokemon' ) {
                        this.etat = 'pokemons';
                        play_F( 'sons/bip.mp3' );
                    } else if ( this.etat == 'type' ) {
                        this.etat = 'types';
                        play_F( 'sons/bip.mp3' );
                    } else if ( this.etat == 'baie' ) {
                        this.etat = 'baies';
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
                                this.getPokemons();
                                this.menu_pokemon.menu_actif = 3;
                            } else {
                                play_F( 'sons/probleme.mp3' );
                            }
                        }
                    } else if ( this.etat == 'types' ) {
                        if ( this.menu_types.menu_actif > 0 ) {
                            play_F( 'sons/pch.mp3' );
                            this.menu_types.menu_actif--;
                        } else {
                            /* Changement de page si possible */
                            if ( this.menu_types.page_prec != null ) {
                                play_F( 'sons/pch.mp3' );
                                this.menu_types.page_active--;
                                this.getTypes();
                                this.menu_types.menu_actif = 3;
                            } else {
                                play_F( 'sons/probleme.mp3' );
                            }
                        }
                    } else if ( this.etat == 'baies' ) {
                        if ( this.menu_baies.menu_actif > 0 ) {
                            play_F( 'sons/pch.mp3' );
                            this.menu_baies.menu_actif--;
                        } else {
                            /* Changement de page si possible */
                            if ( this.menu_baies.page_prec != null ) {
                                play_F( 'sons/pch.mp3' );
                                this.menu_baies.page_active--;
                                this.getBaies();
                                this.menu_baies.menu_actif = 3;
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
                                this.getPokemons();
                                this.menu_pokemon.menu_actif = 0;
                            } else {
                                play_F( 'sons/probleme.mp3' );
                            }
                        }
                    } else if ( this.etat == 'types' ) {
                        if ( this.menu_types.menu_actif < 3 ) {
                            play_F( 'sons/pch.mp3' );
                            this.menu_types.menu_actif++;
                        } else {
                            /* Changement de page si possible */
                            if ( this.menu_types.page_suiv != null ) {
                                play_F( 'sons/pch.mp3' );
                                this.menu_types.page_active++;
                                this.getTypes();
                                this.menu_types.menu_actif = 0;
                            } else {
                                play_F( 'sons/probleme.mp3' );
                            }
                        }
                    } else if ( this.etat == 'baies' ) {
                        if ( this.menu_baies.menu_actif < 3 ) {
                            play_F( 'sons/pch.mp3' );
                            this.menu_baies.menu_actif++;
                        } else {
                            /* Changement de page si possible */
                            if ( this.menu_baies.page_suiv != null ) {
                                play_F( 'sons/pch.mp3' );
                                this.menu_baies.page_active++;
                                this.getBaies();
                                this.menu_baies.menu_actif = 0;
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
