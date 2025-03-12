import * as THREE from 'three';

import { useEffect, useRef } from "react";

function MyThree() {
  const refContainer = useRef(null);
  
  useEffect(() => {
    if (!refContainer.current) return;

    // Get container dimensions
    const width = refContainer.current.clientWidth;
    const height = refContainer.current.clientHeight;

    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    
    // Add gradient background
    // const color1 = new THREE.Color(0x1a1a2e);  // Dark blue
    // const color2 = new THREE.Color(0x0f0f1a);  // Darker blue

    // Purple to Dark Blue:
    const color1 = new THREE.Color(0x4a148c);
    const color2 = new THREE.Color(0x1a237e);

    // Dark Green to Black:
    // const color1 = new THREE.Color(0x1b5e20);
    // const color2 = new THREE.Color(0x000000);


    scene.background = new THREE.Color(color1);
    scene.fog = new THREE.Fog(color2, 1, 1000);
    
    if (!refContainer.current.hasChildNodes()) {
      refContainer.current.appendChild(renderer.domElement);
    }
    
    // Handle window resize
    const handleResize = () => {
      const width = refContainer.current.clientWidth;
      const height = refContainer.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (refContainer.current) {
        refContainer.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={refContainer} style={{ width: '100%', height: '100vh' }}></div>
  );
}

export default MyThree
