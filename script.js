var $ = window.jQuery;

/* https://youtu.be/4kRqai4ZbHA */
/* https://www.youtube.com/watch?v=88qRmxhqoBA */
/* https://youtu.be/PBOpSZja-1A */
/* https://youtu.be/q_uze6Jnv6M */
/* https://youtu.be/TgOm3ewdXcc */

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

        /* Lumières */
        setTimeout( function () {
            $( ".led-rouge" ).removeClass( 'allume' );
        }, 0 );
        setTimeout( function () {
            $( ".led-bleue" ).removeClass( 'allume' );
        }, 500 );

        setTimeout( function () {
            play_F( 'sons/extinction.mp3' );
            $( ".pokedex" ).removeClass( "ouvert" );
            $( ".pokedex" ).removeClass( "allume" );
        }, 500 );
    }
} );

/* Ouverture du Pokédex (clic sur le clapet) */
$( ".partie-secondaire__face--front" ).on( 'click', function () {
    play_F( 'sons/boot.mp3' );

    /* Lumières */
    setTimeout( function () {
        $( ".led-rouge" ).addClass( 'allume' );
    }, 2700 );
    setTimeout( function () {
        $( ".led-bleue" ).addClass( 'allume' );
    }, 5500 );

    setTimeout( function () {
        /* Allumer le Pokedex */
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

/* VUEJS */
var ecran_principal = new Vue( {
    el: '.ecran-principal',
    data: {
        message: 'Principal !'
    }
} );

var ecran_secondaire = new Vue( {
    el: '.ecran-secondaire',
    data: {
        message: 'Secondaire !'
    }
} );

var ecran_vert = new Vue( {
    el: '.ecran-vert',
    data: {
        message: 'Vert !'
    }
} );

var petit_ecran_gauche = new Vue( {
    el: '.petit-ecran-gauche',
    data: {
        message: 'Gauche !'
    }
} );

var petit_ecran_droit = new Vue( {
    el: '.petit-ecran-droit',
    data: {
        message: 'Droit !'
    }
} );
