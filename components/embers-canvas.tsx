"use client"

import { useEffect, useRef } from "react"

export function EmbersCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    function resizeCanvas() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);

    // Configuración de brasas optimizada para móviles
    interface Ember {
      x: number;
      y: number;
      radius: number;
      speed: number;
      alpha: number;
      color: string;
      drift: number;
    }
    
    // Reducir cantidad de brasas en móviles para mejor rendimiento
    const isMobile = window.innerWidth < 768;
    const emberCount = isMobile ? 25 : 60;
    const embers: Ember[] = [];
    const emberColor = 'rgba(35, 71, 75, 0.7)'; // #23474B con alpha
    
    // Optimizar tamaño de brasas para móviles
    const maxRadius = isMobile ? 8 : 12;
    const minRadius = isMobile ? 4 : 8;
    
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: height - Math.random() * 100,
        radius: Math.random() * maxRadius + minRadius,
        speed: Math.random() * 0.7 + 0.3,
        alpha: Math.random() * 0.5 + 0.5,
        color: emberColor,
        drift: (Math.random() - 0.5) * 0.5
      });
    }

    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60; // Reducir FPS en móviles
    const frameTime = 1000 / targetFPS;

    function drawEmbers(currentTime: number) {
      if (!ctx) return;
      
      if (currentTime - lastTime < frameTime) {
        requestAnimationFrame(drawEmbers);
        return;
      }
      
      lastTime = currentTime;
      
      ctx.clearRect(0, 0, width, height);
      for (const ember of embers) {
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
        ctx.fillStyle = ember.color;
        ctx.globalAlpha = ember.alpha;
        
        // Reducir shadow blur en móviles para mejor rendimiento
        if (!isMobile) {
          ctx.shadowColor = ember.color;
          ctx.shadowBlur = 32;
        }
        
        ctx.fill();
        ctx.globalAlpha = 1;
        
        if (!isMobile) {
          ctx.shadowBlur = 0;
        }
        
        // Movimiento
        ember.y -= ember.speed;
        ember.x += ember.drift;
        ember.alpha -= 0.001 + Math.random() * 0.002;
        
        if (ember.y < height * 0.3 || ember.alpha <= 0) {
          // Reiniciar brasa
          ember.x = Math.random() * width;
          ember.y = height - Math.random() * 40;
          ember.radius = Math.random() * maxRadius + minRadius;
          ember.speed = Math.random() * 0.7 + 0.3;
          ember.alpha = Math.random() * 0.5 + 0.5;
          ember.color = emberColor;
          ember.drift = (Math.random() - 0.5) * 0.5;
        }
      }
      requestAnimationFrame(drawEmbers);
    }
    requestAnimationFrame(drawEmbers);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 block pointer-events-none"
    />
  );
} 