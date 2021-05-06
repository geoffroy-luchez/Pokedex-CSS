var $ = window.jQuery;

/* https://youtu.be/4kRqai4ZbHA */
var son_boot = new Audio( 'sons/boot.mp3' );
var son_bouton = new Audio( 'sons/bouton.mp3' );
/* https://www.youtube.com/watch?v=88qRmxhqoBA */
var son_bip = new Audio( 'sons/bip.mp3' );
/* https://youtu.be/PBOpSZja-1A */
var son_extinction = new Audio( 'sons/extinction.mp3' );
/* https://youtu.be/q_uze6Jnv6M */
var son_demarrage = new Audio( 'sons/demarrage.mp3' );
/* https://youtu.be/TgOm3ewdXcc */
var son_probleme = new Audio( 'sons/probleme.mp3' );

/* --------
   Joystick
   -------- */
/* Haut */
$( ".joystick-cliquable--top" ).on( 'mousedown', function () {
    $( ".joystick" ).addClass( 'joystick-angle-top' );
} ).on( 'mouseup mouseleave', function () {
    $( ".joystick" ).removeClass( 'joystick-angle-top' );
} );
/* Bas */
$( ".joystick-cliquable--bottom" ).on( 'mousedown', function () {
    $( ".joystick" ).addClass( 'joystick-angle-bottom' );
} ).on( 'mouseup mouseleave', function () {
    $( ".joystick" ).removeClass( 'joystick-angle-bottom' );
} );
/* Gauche */
$( ".joystick-cliquable--left" ).on( 'mousedown', function () {
    $( ".joystick" ).addClass( 'joystick-angle-left' );
} ).on( 'mouseup mouseleave', function () {
    $( ".joystick" ).removeClass( 'joystick-angle-left' );
} );
/* Droite */
$( ".joystick-cliquable--right" ).on( 'mousedown', function () {
    $( ".joystick" ).addClass( 'joystick-angle-right' );
} ).on( 'mouseup mouseleave', function () {
    $( ".joystick" ).removeClass( 'joystick-angle-right' );
} );

/* -------
   Boutons
   ------- */
/* Boutons bleus et blancs */
$( ".bouton-carre" ).on( 'mousedown', function () {
    $( this ).children().addClass( 'btn-enfonce' );
} ).on( 'mouseup mouseleave', function () {
    $( this ).children().removeClass( 'btn-enfonce' );
} );
/* Bouton noir */
$( ".btn-noir" ).on( 'mousedown', function () {
    $( this ).children().addClass( 'btn-enfonce' );
} ).on( 'mouseup mouseleave', function () {
    $( this ).children().removeClass( 'btn-enfonce' );
} );

/* --------------------------------
   Ouverture / fermeture du Pokédex
   -------------------------------- */
/* Fermture du Pokédex (clic sur le cadenas) */
$( ".lock" ).on( 'click', function () {
    if ( $( ".pokedex" ).hasClass( "allume" ) ) {
        setTimeout( function () {
            son_extinction.play();
            $( ".pokedex" ).removeClass( "ouvert" );
            $( ".pokedex" ).removeClass( "allume" );
        }, 500 );
    }
} );

/* Ouverture du Pokédex (clic sur le clapet) */
$( ".partie-secondaire__face--front" ).on( 'click', function () {
    play_F( 'sons/boot.mp3' )
    setTimeout( function () {
        /* play_F( 'sons/demarrage.mp3' ); */
        $( ".pokedex" ).addClass( "allume" );
    }, 5500 );
    $( '.pokedex' ).toggleClass( "ouvert" );
} );

/* Son des touches */
$( ".bouton-carre__face, .btn-noir__face" ).on( 'click', function () {
    if ( $( ".pokedex" ).hasClass( "allume" ) ) {
        play_F( 'sons/bip.mp3' );
    }

} );
$( ".joystick-cliquable" ).on( 'click', function () {
    if ( $( ".pokedex" ).hasClass( "allume" ) ) {
        play_F( 'sons/pch.mp3' );
    }
} );

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
