;(function () {
  console.log('IIFE JS Loaded!')

  const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .01, 20 );
  camera.position.z = 1;

  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  const canvas = document.getElementById('gameCanvas');
  const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  
  function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.x += .01;
    mesh.rotation.y += .02;
    renderer.render( scene, camera );
  }
  animate();


  // document.body.appendChild( renderer.domElement );

  // // Create the scene, camera, and renderer.
  // var scene = new THREE.Scene();
  // var camera = new THREE.PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );

  // // Instead of appending the renderer's canvas to the DOM,
  // // select the existing canvas element by its id "gameCanvas".
  // var canvas = document.getElementById('gameCanvas');
  // var renderer = new THREE.WebGLRenderer({ canvas: canvas });
  // renderer.setSize(600, 600); // match the canvas dimensions from index.html

  // // Create a box geometry and add a mesh with a basic material.
  // var geometry = new THREE.BoxGeometry();
  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // var cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  // camera.position.z = 5;

  // // Animation loop to render the scene and rotate the box.
  // function animate() {
  //   requestAnimationFrame(animate);
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  //   renderer.render(scene, camera);
  // }
  // animate();

})()