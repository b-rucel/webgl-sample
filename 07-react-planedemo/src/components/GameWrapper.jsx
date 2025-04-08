'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function GameWrapper() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const viewport = {
    width: dimensions.width,
    height: dimensions.height,
  }

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


  // Add this function before the return statement
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Update the return statement
  return (
    <div className="scene-container">
      <div
        ref={containerRef}
        className="rounded relative w-full h-[600px] overflow-hidden bg-gradient-to-bl from-orange-300 to-purple-600 via-pink-500 mx-auto"
      >
        <button
          onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20h6M4 15v5h5M4 9V4h5M15 4h5v5M15 20h5v-5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8V4h4M21 8V4h-4M3 16v4h4M21 16v4h-4" />
            </svg>
          )}
        </button>
      </div>
      {!loaded && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">Loading...</div>}
    </div>
  );

}