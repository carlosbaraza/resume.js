// Namespace
var Codix = Codix || {};

Codix.World = function () {
    
    // Start constructor
        // Number of lines of Code
        this.numLines = 40;

        // Create a container for all the lines of code
        this.codixContainerDOM = document.createElement( 'div' );
        this.codixContainer = $( this.codixContainerDOM );
        this.codixContainer.addClass('codixContainer');
        $('.mainView').append( this.codixContainerDOM ); // Apend it to container .mainView

        // Lets create some objects Codix.Line()
        this.line = new Array(); // Create empty array for all the lines
        for (var i = 0; i<this.numLines; i++) {
            // Add other line of code
            this.line[i] = new Codix.Line();

            // Add child to container
            this.codixContainerDOM.appendChild( this.line[i].elementDOM );
        }
    // End constructor

    // Method for start animation of the lines of code
    this.start = function () {
        for (var i = 0; i < this.numLines ; i++) {
            // Set control var to 0
            this.line[i].isStopped = 0;
            
            this.line[i].update(); // Start updating
        }
    };

    // Method for stopping animation
    this.stop = function () {
        for (var i = 0; i < this.numLines ; i++) {
            this.line[i].stop(); // Start updating
        }
    };

    this.stopNotInstant = function () {
        for (var i = 0; i < this.numLines ; i++) {
            this.line[i].stopNotInstant(); // Start updating
        }
    };

};

/*
 *  Class for falling lines of code objects
*/
Codix.Line = function () {
    this.text = "var codixContainer = document.createElement( 'div' );";
    
    // Random x initial position
    this.xPos = Math.random() * 100;
    this.yPos = Math.random() * 60 - 20 + '%';
    
    // Stop control
    this.isStopped = 1;
    
    // Speed of falling
    this.slowness = Math.random();
    
    this.elementDOM = document.createElement('p');
    $( this.elementDOM ).addClass('codixLine');
    this.elementDOM.innerHTML = this.text;
 
    // Set some styles
    this.elementDOM.style.left = this.xPos - 250/window.innerWidth*100 + '%'; //set -offset on left in percent
    this.elementDOM.style.top = this.yPos;    
    this.elementDOM.style.opacity = this.slowness;
    
    // method: Move line to bottom 
    this.update = function () {
        var that = this;

        // Transition using CSS3 if available with transit.js plugin for jQuery 1.8.2 (Modded because was incompatible with 1.8.2, only with 1.7.x)
        $( this.elementDOM ).transition(
            { top: "100%", opacity: 0 }
            , this.slowness * 20000 
            ,'in'
            , function () {
                if ( !that.isStopped ) {
                    $( that.elementDOM ).css({ top: "-60%", opacity: 1 });
                    that.update();
                }
            }
        ); 
    };

    this.stop = function () {
        // Set control var to 1
        this.isStopped = 1;
        
        // Refer the current object for the callback function
        var that = this;
        
        // Instant stop in webkit only
        this.elementDOM.style.webkitTransition = 'all 1s linear 0s';
        this.elementDOM.style.MozTransition = 'all 1s linear 0s'; 
        $( this.elementDOM ).css({ top: that.yPos, opacity: that.slowness});
    };

    this.stopNotInstant = function () {
        // Set control var to 1
        this.isStopped = 1;
        
        $( this.elementDOM ).transition(
                { top: this.yPos, opacity: this.slowness }
                , this.slowness * 1000
            );
    };

};

// Create the world
var codix = new Codix.World();

// Start animation (Later versions with cross-browser)
codix.start();


    $('.myAvatar').hover( function () {
        $('.mainView').addClass('red');
        codix.stop();
    }, function() {
        $('.mainView').removeClass('red');
        codix.start();
    });
