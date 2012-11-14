/*  Add the next tags to enable Three.JS
 * 
        <!-- Require.JS for includes in Main.js -->
        <script type="text/javascript" src="vendor/require.js"></script>
        
        <script type="text/javascript" src="vendor/three.js.git/build/three.js"></script>
        
        <!-- Include the Detector for WebGL -->
        <script type="text/javascript" src="vendor\three.js.git\examples\js/Detector.js"></script>
        
        <!-- Add stats to the scene -->
        <script type="text/javascript" src="vendor/stats.js.git/build/stats.min.js"></script>
        
        <!-- Add trackball control -->
        <script type="text/javascript" src="vendor/three.js.git/examples/js/controls/TrackballControls.js"></script>
        
        <!-- Add window resize of threex.js -->
        <script type="text/javascript" src="vendor/threex.git/THREEx.WindowResize.js"></script>
        
        <!-- Add GUI.DAT -->
        <script type="text/javascript" src="vendor/dat.gui.js"></script>
        
        <!-- <script type="text/javascript" src="js/three.js"></script> -->
 * 
 * 
 */


var container, renderer, stats;
var scene;
var camera;

var opt;
require(["js/optDefine.js"], function () {
    // Add dat.gui
    opt = new options();
    var gui = new dat.GUI();
    gui.add(opt, 'frec1', 0, 10);
    gui.add(opt, 'frec2', 0, 10);
    gui.add(opt, 'num1', 0, 1);
    gui.add(opt, 'num2', 0, 1);
    gui.add(opt, 'amplitude1', 0, 10);
    gui.add(opt, 'amplitude2', 0, 10);
    gui.add(opt, 'convolucion');
    
    init();
    animate();
});

/**
 * Initialization function
 */
function init() {
    container = document.createElement( 'div' );
    $('.mainView').append( container );

    //Start renderer
    if ( Detector.webgl ) {
        renderer = new THREE.WebGLRenderer({
                antialias		: true,	// to get smoother output
                preserveDrawingBuffer	: true	// to allow screenshot
        });
        
    }else{
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //Create Scene
    scene = new THREE.Scene();

    // Create the Stats
    stats = new Stats();
    stats.domElement.style.position	= 'absolute';
    stats.domElement.style.top	= '0px';
    document.body.appendChild( stats.domElement );

    

    // Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 60);
    camera.position.set(0, 3, 5).normalize().multiplyScalar(28/*25*/);
    camera.target = new THREE.Vector3(0,0,0);
    scene.add(camera);
    
    // create a camera contol
    cameraControls = new THREE.TrackballControls( camera );
    cameraControls.rotateSpeed = 1.0;
    cameraControls.zoomSpeed = 1.2;
    cameraControls.panSpeed = 0.8;
    cameraControls.noZoom = false;
    cameraControls.noPan = false;
    cameraControls.staticMoving = false;
    cameraControls.dynamicDampingFactor = 0.3;
    cameraControls.keys = [ 65, 83, 68 ];
    
    // transparently support window resize
    THREEx.WindowResize(renderer, camera);
    
    // Plane
    var width = 25;
    var height = 25;
    var widthRes = 50;
    var heightRes = 50;
    var planeGeometry = new THREE.PlaneGeometry( width, height, widthRes, heightRes );
    planeGeometry.dynamic = true;
    planeGeometry.width = width;
    planeGeometry.height = height;
    planeGeometry.widthRes = widthRes;
    planeGeometry.heightRes = heightRes;
    //plane = new THREE.Mesh( planeGeometry, new THREE.MeshDepthMaterial( { side: THREE.DoubleSide, overdraw: true , wireframe: true} ));
    plane = new THREE.Mesh( planeGeometry, new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: true } ) );
    plane.rotation.x = - Math.PI / 2;
    plane.dynamic = true;
    scene.add( plane );
    
}

/**
 * Animate Function
 */
function animate() {
    requestAnimationFrame ( animate );
    
    render();
    
    stats.update();
}

/**
 * Renderer Function
 */
function render() {
    // Refresh camera look at target
    camera.lookAt(camera.target);
    
    // variable which is increase by Math.PI every seconds - usefull for animation
    date = new Date();
    var PISeconds = (date.getSeconds() + date.getMilliseconds()/1000) * .5 * Math.PI;
    
    // update camera controls
    cameraControls.update();
    
    for (var j = 0; j < plane.geometry.heightRes+1; j++) {
            for (var i = 0; i < plane.geometry.widthRes+1; i++) {
                if( opt.convolucion ) {
                        plane.geometry.vertices[j*(plane.geometry.widthRes+1)+i].z = 
                            Math.sin(PISeconds * opt.frec1 + j* opt.num1 /(plane.geometry.heightRes/25))*opt.amplitude1*(1-j/plane.geometry.heightRes) * Math.sin(PISeconds * opt.frec2 + i * opt.num2 /(plane.geometry.widthRes/25))*opt.amplitude2*(1-i/plane.geometry.widthRes);
                }else {
                    plane.geometry.vertices[j*(plane.geometry.widthRes+1)+i].z = 
                            Math.sin(PISeconds * opt.frec1 + j* opt.num1 /(plane.geometry.heightRes/25))*opt.amplitude1*(1-j/plane.geometry.heightRes) + Math.sin(PISeconds * opt.frec2 + i * opt.num2 /(plane.geometry.widthRes/25))*opt.amplitude2*(1-i/plane.geometry.widthRes);
                }
            }
    }

    plane.geometry.verticesNeedUpdate = true;
    
    renderer.render( scene, camera );
}
