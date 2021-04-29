var pokedex = document.querySelector( '.pokedex' );
var radioGroup = document.querySelector( '.radio-group' );
var currentClass = '';

function changeSide() {
    var checkedRadio = radioGroup.querySelector( ':checked' );
    var showClass = 'show-' + checkedRadio.value;
    if ( currentClass ) {
        pokedex.classList.remove( currentClass );
    }
    pokedex.classList.add( showClass );
    currentClass = showClass;
}
// set initial side
//changeSide();

radioGroup.addEventListener( 'change', changeSide );
