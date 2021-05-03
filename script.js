var pokedex = document.querySelector( '.pokedex' );
var radioGroup = document.querySelector( '.radio-group' );
var currentClass = '';

var $ = window.jQuery;

function changeSide() {
    var checkedRadio = radioGroup.querySelector( ':checked' );
    var showClass = 'show-' + checkedRadio.value;
    if ( currentClass ) {
        pokedex.classList.remove( currentClass );
    }
    pokedex.classList.add( showClass );
    currentClass = showClass;
}

radioGroup.addEventListener( 'change', changeSide );

/* Joystick */
/* Haut */
$( ".joystick-cliquable__top" ).on( 'mousedown', function () {
    $( ".joystick" ).addClass( 'joystick-angle-top' );
} ).on( 'mouseup mouseleave', function () {
    $( ".joystick" ).removeClass( 'joystick-angle-top' );
} );
/* Bas */
$( ".joystick-cliquable__bottom" ).on( 'mousedown', function () {
    $( ".joystick" ).addClass( 'joystick-angle-bottom' );
} ).on( 'mouseup mouseleave', function () {
    $( ".joystick" ).removeClass( 'joystick-angle-bottom' );
} );
/* Gauche */
$( ".joystick-cliquable__left" ).on( 'mousedown', function () {
    $( ".joystick" ).addClass( 'joystick-angle-left' );
} ).on( 'mouseup mouseleave', function () {
    $( ".joystick" ).removeClass( 'joystick-angle-left' );
} );
/* Droite */
$( ".joystick-cliquable__right" ).on( 'mousedown', function () {
    $( ".joystick" ).addClass( 'joystick-angle-right' );
} ).on( 'mouseup mouseleave', function () {
    $( ".joystick" ).removeClass( 'joystick-angle-right' );
} );
