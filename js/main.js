
var RESUME = RESUME || {};

function RESUME() {
    this.currentView = 'main';
    
}

RESUME.prototype.goToView = function( viewToGo ) {
    $('.reveal').removeClass('current');
    $('.mainView').removeClass('current');

    if ( viewToGo == 'main' ){
        $('.mainView').addClass('current');
    }

    if ( viewToGo == 'slides' ){
        $('.reveal').addClass('current');
    }
    console.log(this.currentView);
}


var resume = new RESUME();

