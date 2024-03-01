/**
 * @author jbouny / https://github.com/fft-ocean
 */
// Modified by HSU, Li-hsiu

function skyBoxInitialize(imageLoader, scene) {
    var cubeShader = THREE.ShaderLib['cube'];
    var skyBoxMaterial = new THREE.ShaderMaterial( {
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        side: THREE.BackSide
    } );

    skyBox = new THREE.Mesh(
        new THREE.BoxGeometry( 450000, 450000, 450000 ),
        skyBoxMaterial
    );
    scene.add( skyBox );
    var textureName = '';
    var textureExt = ".jpg";		
    textureName = 'sky';
    var sources = [
        'img/' + textureName + '_west' + textureExt,
        'img/' + textureName + '_east' + textureExt,
        'img/' + textureName + '_up' + textureExt,
        'img/' + textureName + '_down' + textureExt,
        'img/' + textureName + '_south' + textureExt,
        'img/' + textureName + '_north' + textureExt
    ];
    var images = [];
    var cubeMap = new THREE.CubeTexture( images );
    cubeMap.flipY = false;
    var imageLoader = imageLoader;
    var loaded = 0;
    var loadTexture = function ( i ) {
        imageLoader.load( sources[ i ], function ( image ) {
            cubeMap.images[ i ] = image;
            loaded ++;
            if ( loaded === 6 ) {
                cubeMap.needsUpdate = true;
            }
        } );

    }
    for ( var i = 0, il = sources.length; i < il; ++ i ) {
        loadTexture( i );
    }
    cubeMap.format = THREE.RGBFormat;
    cubeMap.generateMipmaps = false;
    cubeMap.magFilter = THREE.LinearFilter;
    cubeMap.minFilter = THREE.LinearFilter;
    skyBox.material.uniforms['tCube'].value = cubeMap;

}