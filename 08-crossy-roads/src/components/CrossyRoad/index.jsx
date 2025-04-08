'use client';

import { useEffect, useRef, useState } from 'react';
import { createScene, createLights } from './utils/scene';

export default function CrossyRoad() {
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
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const { scene, camera, renderer } = createScene(viewport, containerRef.current);
    
  }, []);


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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
          )}
        </button>
      </div>
      {!loaded && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">Loading...</div>}
    </div>
  );
}