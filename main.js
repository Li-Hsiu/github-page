var camera, scene, renderer, controls, ocean, loader, imageLoader, mainDirectionalLight, cubeMesh, skyBox;

function init() {
    // Initialize Renderer
    renderer = new THREE.WebGLRenderer({webxr: true});
    renderer.context.getExtension('OES_texture_float');
    renderer.context.getExtension('OES_texture_float_linear');
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);

    // Initialize Scene
    scene = new THREE.Scene();

    // Initialize Camera
    camera = new THREE.PerspectiveCamera(55.0, window.innerWidth / window.innerHeight, 0.5, 1000000);
    camera.position.set(0, 350, 800);
    camera.lookAt(new THREE.Vector3());
    scene.add(camera);

    // Initialize Orbit control
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.target.set(0, 300.0, 0);
    controls.noKeys = true;
    controls.userPanSpeed = 0;
    controls.minDistance = 0;
    controls.maxDistance = 20000.0;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI * 0.75;

    // Initialize Image Loader
    loader = new THREE.LoadingManager();
    imageLoader = new THREE.ImageLoader(loader);
    
    // Initialize Main Directional Light
    mainDirectionalLight = new THREE.DirectionalLight(new THREE.Color( 1, 0.95, 0.9 ), 1.5);
    mainDirectionalLight.position.set( 0.2, 0.5, 1);
    scene.add(mainDirectionalLight);

    // Initialize Ocean
    var gsize = 512;
    var res = 512;
    var gres = 256;
    ocean = new THREE.Ocean(renderer, camera, scene,
    {
        INITIAL_SIZE : 200.0,
        INITIAL_WIND : [ 10.0, 10.0 ],
        INITIAL_CHOPPINESS : 3.6,
        CLEAR_COLOR : [ 1.0, 1.0, 1.0, 0.0 ],
        SUN_DIRECTION : mainDirectionalLight.position.clone(),
        OCEAN_COLOR: new THREE.Vector3( 0.35, 0.4, 0.45 ),
        SKY_COLOR: new THREE.Vector3( 10.0, 13.0, 15.0 ),
        EXPOSURE : 0.15,
        GEOMETRY_RESOLUTION: gres,
        GEOMETRY_SIZE : gsize,
        RESOLUTION : res
    } );
    
    // Initialize Testing Cube
    cubeMesh = new THREE.Mesh( new THREE.BoxGeometry( 200, 200, 200 ), new THREE.MeshPhongMaterial({ color: 'pink' }) );
    cubeMesh.position.y = 200;
    scene.add( cubeMesh );

    // Initialize Sky
    skyBoxInitialize(imageLoader,scene);

    resize( window.innerWidth, window.innerHeight );
}

function update() {
    // Update camera position
    if(camera.position.y < 0.0) {
        camera.position.y = 2.0;
    }
    var currentTime = new Date().getTime();
    ocean.deltaTime = (currentTime - lastTime) / 1000 || 0.0;
    lastTime = currentTime;
    
    ocean.render();
    ocean.update();
    controls.update();
    renderer.render(scene, camera);
}

function render() {
	requestAnimationFrame( render );
	update();
};

function resize(inWidth, inHeight) {
    camera.aspect = inWidth / inHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( inWidth, inHeight );
}

var lastTime = new Date().getTime();
init();

render();