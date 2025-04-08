'use client';
import { useEffect, useRef, useState } from 'react';
import { Sea } from './classes/Sea';
import { Sky } from './classes/Sky';
import { AirPlane } from './classes/Airplane';
import { createScene, createLights } from './utils/scene';

export default function PlaneDemo() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const viewport = {
    width: dimensions.width,
    height: dimensions.height,
    camera: {
      fov: 60,
      near: 1,
      far: 10000,
      position: { x: 0, y: 100, z: 200 }
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const { scene, camera, renderer } = createScene(viewport, containerRef.current);
    const lights = createLights(scene);

    // Create objects
    const airplane = new AirPlane();
    airplane.mesh.scale.set(.25, .25, .25);
    airplane.mesh.position.y = 100;
    scene.add(airplane.mesh);

    const sea = new Sea();
    sea.mesh.position.y = -600;
    scene.add(sea.mesh);

    const sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);

    // Animation loop
    function loop() {
      airplane.propeller.rotation.x += 0.3;
      sea.mesh.rotation.z += .005;
      sky.mesh.rotation.z += .01;

      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }

    loop();
    setLoaded(true);

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(viewport.width, viewport.height);
      camera.aspect = viewport.width / viewport.height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [viewport]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="plane-demo">
      <div
        ref={containerRef}
        className="rounded relative w-full h-[600px] overflow-hidden bg-gradient-to-b from-[#7dcbff] to-[#f7d9aa] mx-auto"
      >
        <button
          onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20h6M4 15V9m16 6V9" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-9v4m0-4h-4m4 4l-5 5M4 16v4m0-4H8m-4 4l5-5m11 5v-4m0 4h-4m4-4l-5 5" />
            </svg>
          )}
        </button>
      </div>
      {!loaded && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">Loading...</div>}
    </div>
  );
}