
var Resume = Resume || {};

function Resume() {
    this.currentView = 'main';
}

Resume.prototype.goToView = function( viewToGo ) {
    $('.reveal').removeClass('current toLeft toRight');
    $('.mainView').removeClass('current toLeft toRight');
    $('.cv').removeClass('current');
    $('.coverLetter').removeClass('current');

    if ( viewToGo == 'main' ){
        $('.mainView').addClass('current');
        this.currentView = 'main';
    }

    if ( viewToGo == 'awesomeSlides' ){
        $('.reveal').addClass('current');
        this.currentView = 'awesomeSlides';
    }

    if ( viewToGo == 'cv' ){
        $( '.mainView, .reveal' ).addClass('toLeft')
        $('.cv').addClass('current');
        this.currentView = 'cv';
    }

    if ( viewToGo == 'coverLetter' ){
        $( '.mainView, .reveal' ).addClass('toRight')
        $('.coverLetter').addClass('current');
        this.currentView = 'coverLetter';
    }
    console.log(this.currentView);
}


var resume = new Resume();

