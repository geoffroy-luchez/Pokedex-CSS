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
var app = new Vue( {
    el: '.pokedex',
    data: {
        ecran_principal: 'Principal !',
        ecran_secondaire: 'Secondaire !',
        ecran_gauche: 'Gauche !',
        ecran_droit: 'Droit !',
        ecran_vert: 'Vert !'
    },
    methods: {
        ouverture() {
            if ( !$( ".pokedex" ).hasClass( "ouvert" ) && !$( ".pokedex" ).hasClass( "bouge" ) ) {
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
                setTimeout( function () {
                    /* Allumer le Pokedex */
                    $( ".pokedex" ).addClass( "allume" );
                    $( '.pokedex' ).removeClass( "bouge" );
                }, 5500 );
                $( '.pokedex' ).addClass( "ouvert" );
            }
        },
        fermeture() {
            if ( $( ".pokedex" ).hasClass( "ouvert" ) && $( ".pokedex" ).hasClass( "allume" ) && !$( ".pokedex" ).hasClass( "bouge" ) ) {
                console.log( 'ferme' );
                $( ".pokedex" ).addClass( "bouge" )
                /* Lumières */
                setTimeout( function () {
                    $( ".led-rouge" ).removeClass( 'allume' );
                }, 0 );
                setTimeout( function () {
                    $( ".led-bleue" ).removeClass( 'allume' );
                }, 500 );
                /* Son et mouvements */
                setTimeout( function () {
                    play_F( 'sons/extinction.mp3' );
                    $( ".pokedex" ).removeClass( "ouvert" );
                    $( ".pokedex" ).removeClass( "allume" );
                    $( ".pokedex" ).removeClass( "bouge" );
                }, 500 );
            }
        },
        pression() {
            if ( $( ".pokedex" ).hasClass( "allume" ) ) {
                play_F( 'sons/bip.mp3' );
            }
        },
        pression_joystick( param ) {
            if ( param === 'top' ) {
                $( ".joystick" ).addClass( 'joystick-angle-top' );
                if ( $( ".pokedex" ).hasClass( "allume" ) ) {
                    play_F( 'sons/pch.mp3' );
                }
            } else if ( param === 'bottom' ) {
                $( ".joystick" ).addClass( 'joystick-angle-bottom' );
                if ( $( ".pokedex" ).hasClass( "allume" ) ) {
                    play_F( 'sons/pch.mp3' );
                }
            } else if ( param === 'left' ) {
                $( ".joystick" ).addClass( 'joystick-angle-left' );
                if ( $( ".pokedex" ).hasClass( "allume" ) ) {
                    play_F( 'sons/pch.mp3' );
                }
            } else if ( param === 'right' ) {
                $( ".joystick" ).addClass( 'joystick-angle-right' );
                if ( $( ".pokedex" ).hasClass( "allume" ) ) {
                    play_F( 'sons/pch.mp3' );
                }
            } else {
                $( ".joystick" ).removeClass( 'joystick-angle-top' );
                $( ".joystick" ).removeClass( 'joystick-angle-bottom' );
                $( ".joystick" ).removeClass( 'joystick-angle-left' );
                $( ".joystick" ).removeClass( 'joystick-angle-right' );
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
