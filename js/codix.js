// Namespace
var Codix = Codix || {};

Codix.World = function () {
    
    // Start constructor
        // Number of lines of Code
        this.numLines = 100;

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
            this.line[i].update(); // Start updating
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
    
    // Speed of falling
    this.slowness = Math.random();
    
    this.elementDOM = document.createElement('p');
    $( this.elementDOM ).addClass('codixLine');
    this.elementDOM.innerHTML = this.text;
    
    //this.elementDOM.style.position = 'relative';
    this.elementDOM.style.left = this.xPos - 20 + '%';
    
    this.elementDOM.style.top = Math.random() * 40 + '%';
    
    this.elementDOM.style.opacity = this.slowness;
    this.elementDOM.style.webkitTransition = "all " + this.slowness * 30 + "s linear";
    
    this.update = function () {
        // Reset the line to top
        $( this.elementDOM ).css({ top: "-20%", opacity: 1 });
        
        // Refer the current object for the callback function
        var that = this;
        
        // Move line to bottom
        $( this.elementDOM ).transition(
                { top: "80%", opacity: 0 }
                , this.slowness * 30000
                , function () {
                    that.update();
                }
            );
    };

};

// Create the world
var codix = new Codix.World();

// Start animation (Later versions with cross-browser)
//codix.start();
