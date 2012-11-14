
var Resume = Resume || {};

function Resume() {
    this.currentView = 'main';
}

Resume.prototype.goToView = function( viewToGo ) {
    $('.reveal').removeClass('current');
    $('.mainView').removeClass('current');

    if ( viewToGo == 'main' ){
        $('.mainView').addClass('current');
        this.currentView = 'main';
    }

    if ( viewToGo == 'awesomeSlides' ){
        $('.reveal').addClass('current');
        this.currentView = 'awesomeSlides';
    }
    console.log(this.currentView);
}


var resume = new Resume();

