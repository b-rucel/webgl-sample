import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

function MyThree() {
  const refContainer = useRef(null);
  
  useEffect(() => {
    if (!refContainer.current) return;

    // Get container dimensions
    const width = refContainer.current.clientWidth;
    const height = refContainer.current.clientHeight;

    // === THREE.JS CODE START ===
    const clock = new THREE.Clock();
    let mixer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Setup environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.background = new THREE.Color(0xbfe3dd);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    
    // Setup camera and controls
    camera.position.set(5, 2, 8);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    
    if (!refContainer.current.hasChildNodes()) {
      refContainer.current.appendChild(renderer.domElement);
    }
    
    // Setup model loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    
    // Load the model
    loader.load('/models/gltf/LittlestTokyo.glb', (gltf) => {
      const model = gltf.scene;
      model.position.set(1, 1, 0);
      model.scale.set(0.01, 0.01, 0.01);
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      mixer.clipAction(gltf.animations[0]).play();
    }, undefined, (error) => {
      console.error(error);
    });

    // Handle window resize
    const handleResize = () => {
      const width = refContainer.current.clientWidth;
      const height = refContainer.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (refContainer.current) {
        refContainer.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pmremGenerator.dispose();
    };
  }, []);

  return (
    <div ref={refContainer} style={{ width: '100%', height: '100vh' }}></div>
  );
}

export default MyThree;
