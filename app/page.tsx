'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Componente Banner "Coming Soon"
function ComingSoonBanner() {
  return (
    <div className="fixed top-0 left-0 w-full h-[38px] bg-[#111] text-white flex items-center overflow-hidden z-[100] shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
      <div className="w-full whitespace-nowrap overflow-hidden flex items-center relative">
        <div className="inline-block whitespace-nowrap animate-marquee">
          <span className="inline-block min-w-max font-bold text-lg tracking-[2px] mr-10 text-white">Coming soon</span>
          <span className="inline-block min-w-max font-bold text-lg tracking-[2px] mr-10 text-[#23474B]">Coming soon</span>
          <span className="inline-block min-w-max font-bold text-lg tracking-[2px] mr-10 text-white">Coming soon</span>
          <span className="inline-block min-w-max font-bold text-lg tracking-[2px] mr-10 text-[#23474B]">Coming soon</span>
          <span className="inline-block min-w-max font-bold text-lg tracking-[2px] mr-10 text-white">Coming soon</span>
        </div>
      </div>
    </div>
  );
}

// Componente Canvas de Brasas
function EmbersCanvas() {
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

    // Configuración de brasas
    interface Ember {
      x: number;
      y: number;
      radius: number;
      speed: number;
      alpha: number;
      color: string;
      drift: number;
    }
    
    const emberCount = 60;
    const embers: Ember[] = [];
    const emberColor = 'rgba(35, 71, 75, 0.7)'; // #23474B con alpha
    
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: height - Math.random() * 100,
        radius: Math.random() * 12 + 8,
        speed: Math.random() * 0.7 + 0.3,
        alpha: Math.random() * 0.5 + 0.5,
        color: emberColor,
        drift: (Math.random() - 0.5) * 0.5
      });
    }

    function drawEmbers() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const ember of embers) {
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
        ctx.fillStyle = ember.color;
        ctx.globalAlpha = ember.alpha;
        ctx.shadowColor = ember.color;
        ctx.shadowBlur = 32;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        
        // Movimiento
        ember.y -= ember.speed;
        ember.x += ember.drift;
        ember.alpha -= 0.001 + Math.random() * 0.002;
        
        if (ember.y < height * 0.3 || ember.alpha <= 0) {
          // Reiniciar brasa
          ember.x = Math.random() * width;
          ember.y = height - Math.random() * 40;
          ember.radius = Math.random() * 12 + 8;
          ember.speed = Math.random() * 0.7 + 0.3;
          ember.alpha = Math.random() * 0.5 + 0.5;
          ember.color = emberColor;
          ember.drift = (Math.random() - 0.5) * 0.5;
        }
      }
      requestAnimationFrame(drawEmbers);
    }
    drawEmbers();

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

// Componente Modal Demo
function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Solicitud de demo Xquisito');
    const body = encodeURIComponent(
      `Nombre: ${formData.nombre}\nCorreo: ${formData.correo}\nMensaje: ${formData.mensaje}`
    );
    window.location.href = `mailto:adriansalazar@xquisito.ai?subject=${subject}&body=${body}`;
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-65"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white mx-auto px-7 py-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] w-full max-w-[370px] relative flex flex-col items-center">
        <Image 
          src="/xquisito-logo.png" 
          alt="Logo Xquisito" 
          width={70} 
          height={70}
          className="w-[70px] mb-2 -mt-2"
        />
        <button 
          onClick={onClose}
          className="absolute top-3 right-5 text-2xl text-gray-600 hover:text-[#FF00C8] transition-colors cursor-pointer"
        >
          ×
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Solicita una reunión</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre completo"
            required
            className="px-3.5 py-2.5 rounded-lg border-2 border-[#23474B] text-base bg-[#f7fafc] text-[#222c3a] focus:outline-none focus:ring-2 focus:ring-[#23474B] focus:bg-white box-border"
          />
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            placeholder="Correo electrónico"
            required
            className="px-3.5 py-2.5 rounded-lg border-2 border-[#23474B] text-base bg-[#f7fafc] text-[#222c3a] focus:outline-none focus:ring-2 focus:ring-[#23474B] focus:bg-white box-border"
          />
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleInputChange}
            placeholder="Mensaje (opcional)"
            className="px-3.5 py-2.5 rounded-lg border-2 border-[#23474B] text-base bg-[#f7fafc] text-[#222c3a] resize-none min-h-[70px] max-h-[180px] focus:outline-none focus:ring-2 focus:ring-[#23474B] focus:bg-white box-border"
          />
          <button
            type="submit"
            className="bg-[#23474B] text-white py-3 px-6 rounded-full font-bold transition-colors hover:bg-[#183135] border-none text-lg mt-7"
          >
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}

// Componente principal
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinLeft, setSpinLeft] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinLeft(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <ComingSoonBanner />
      
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black mt-[38px]">
        <EmbersCanvas />
        
        <div className="text-center text-white p-5 z-10 relative flex flex-col items-center h-screen justify-center">
          <Image
            src="/xquisito-logo.png"
            alt="Logo Xquisito"
            width={200}
            height={200}
            className={`w-[200px] mb-10 mt-0 opacity-0 scale-85 ${
              spinLeft ? 'animate-logo-spin-left' : 'animate-logo-fade-in'
            }`}
          />
          
          <div className="mt-10 w-full flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-2.5 opacity-0 translate-y-5 animate-fade-in-up">
              Revoluciona la experiencia en tu restaurante
            </h1>
            <p className="text-xl mb-5 opacity-0 translate-y-5 animate-fade-in-up animation-delay-500">
              Pedidos sin fricción, pagos instantáneos y datos inteligentes.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#23474B] text-white py-3 px-6 rounded-full font-bold transition-colors hover:bg-[#183135] border-none text-lg mt-7 opacity-0 translate-y-5 animate-fade-in-up animation-delay-1000 cursor-pointer"
            >
              Agenda un demo
            </button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
