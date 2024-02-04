import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'; 
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, cube;

init();
animate()

function init() {
    scene = new THREE.Scene(); 
    scene.background = new THREE.Color('skyblue');

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100); 
    camera.lookAt(0, 0, 0);
    camera.position.set(0,0,40);

    renderer = new THREE.WebGLRenderer(); 
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio); 

    renderer.xr.enabled = true;

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    const geometryCube = new THREE.BoxGeometry(2, 2, 2); 
    const materialCube = new THREE.MeshBasicMaterial( { color: 0xFFC0CB } ); 
    cube = new THREE.Mesh(geometryCube, materialCube); 
    scene.add(cube);

    window.addEventListener('resize', onWindowResize);
}

function animate() { 
    //requestAnimationFrame(animate); 
    renderer.setAnimationLoop(render); 
}

function render() {
    cube.rotation.x += 0.01; 
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

