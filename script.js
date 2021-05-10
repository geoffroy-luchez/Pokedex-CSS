var $ = window.jQuery;

/* https://youtu.be/4kRqai4ZbHA */
/* https://www.youtube.com/watch?v=88qRmxhqoBA */
/* https://youtu.be/PBOpSZja-1A */
/* https://youtu.be/q_uze6Jnv6M */
/* https://youtu.be/TgOm3ewdXcc */

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

/* VUEJS */
/* Composant - Ecran principal */
Vue.component( "ecran-principal__menu", {
    props: ['menu'],
    template: `
    <div>

    </div>`
} );

var app = new Vue( {
    el: '.pokedex',
    data: {
        etat: 'eteint',
        boutons_bleus: [
            "111", "222", "333"
        ],
        menu: [
            "Tous les pokémons", "Pokémons par type", "Pokémons favoris", "Liste des baies"
        ],
        menu_actif: '0',
        ecran_secondaire: '',
        ecran_gauche: '',
        ecran_droit: '',
        ecran_vert: ''
    },
    computed: {
        ecran_principal_actuel: function () {
            if ( this.etat != 'eteint' ) {
                return "ecran-principal__" + this.etat;
            }
        },
        ecran_secondaire_actuel: function () {
            if ( this.etat != 'eteint' ) {
                return "ecran-secondaire__" + this.etat;
            }
        }
    },
    methods: {
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
                /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction annonyme ) */
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
                /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction annonyme ) */
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
                /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction annonyme ) */
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
                /* ( utilisation d'une fonction fléchée, sinon "this" ne pointe pas sur l'instance Vue mais sur la fonction annonyme ) */
                setTimeout( () => {

                    this.etat = 'menu';

                    /* Allumer le Pokedex */
                    $( ".pokedex" ).addClass( "allume" );
                    $( '.pokedex' ).removeClass( "bouge" );

                }, 5500 );
            }
        },
        pression() {
            if ( $( ".pokedex" ).hasClass( "allume" ) ) {
                play_F( 'sons/bip.mp3' );
            }
        },
        pression_joystick( param ) {
            /* Rien ne marche pas si le Pokédex est éteint */
            if ( $( ".pokedex" ).hasClass( "allume" ) ) {

                if ( param === 'top' ) {
                    /* Bouton haut */
                    if ( this.menu_actif > 0 ) {
                        play_F( 'sons/pch.mp3' );
                        this.menu_actif--;
                    } else {
                        play_F( 'sons/probleme.mp3' );
                    }
                    $( ".joystick" ).addClass( 'joystick-angle-top' );
                } else if ( param === 'bottom' ) {
                    /* Bouton bas */
                    if ( this.menu_actif < 3 ) {
                        play_F( 'sons/pch.mp3' );
                        this.menu_actif++;
                    } else {
                        play_F( 'sons/probleme.mp3' );
                    }
                    $( ".joystick" ).addClass( 'joystick-angle-bottom' );
                } else if ( param === 'left' ) {
                    /* Bouton gauche */
                    $( ".joystick" ).addClass( 'joystick-angle-left' );
                    play_F( 'sons/probleme.mp3' );
                } else if ( param === 'right' ) {
                    /* Bouton droite */
                    $( ".joystick" ).addClass( 'joystick-angle-right' );
                    play_F( 'sons/probleme.mp3' );
                } else {
                    /* Relachement ou sortie de bouton */
                    $( ".joystick" ).removeClass( 'joystick-angle-top' );
                    $( ".joystick" ).removeClass( 'joystick-angle-bottom' );
                    $( ".joystick" ).removeClass( 'joystick-angle-left' );
                    $( ".joystick" ).removeClass( 'joystick-angle-right' );
                }
            }
        },
        pression_ok() {
            console.log( 'ok' );
        },
        pression_back() {
            console.log( 'back' );
        }
    }
} );
