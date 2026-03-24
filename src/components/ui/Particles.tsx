"use client";

import { useRef, useEffect, useCallback } from "react";

type Particle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export default function Particles({
  quantity = 30,
  staticity = 50,
  ease = 50,
}: {
  quantity?: number;
  staticity?: number;
  ease?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Particle[]>([]);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const circleParams = useCallback((): Particle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 0.5;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.4 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 2;
    return { x, y, translateX, translateY, size, alpha, targetAlpha, dx, dy, magnetism };
  }, []);

  const drawParticles = useCallback(() => {
    circles.current = [];
    for (let i = 0; i < quantity; i++) {
      circles.current.push(circleParams());
    }
  }, [quantity, circleParams]);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      canvasSize.current.w = canvasRef.current.parentElement.offsetWidth;
      canvasSize.current.h = canvasRef.current.parentElement.offsetHeight;
      canvasRef.current.width = canvasSize.current.w;
      canvasRef.current.height = canvasSize.current.h;
    }
  }, []);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    drawParticles();
  }, [resizeCanvas, drawParticles]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = e.clientX - rect.left - w / 2;
      const y = e.clientY - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mousePosition.current = { x, y };
      }
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();

    let animationFrameId: number;

    function render() {
      if (!context.current) return;
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      
      circles.current.forEach((circle, i) => {
        const edge = [
          circle.x + circle.translateX - circle.size,
          canvasSize.current.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          canvasSize.current.h - circle.y - circle.translateY - circle.size,
        ];
        const closestEdge = edge.reduce((a, b) => Math.min(a, b));
        const remapClosestEdge = parseFloat(Math.min(closestEdge / 20, 1).toFixed(2));
        
        if (remapClosestEdge > 1) {
          circle.alpha += 0.02;
          if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge;
        }

        circle.x += circle.dx;
        circle.y += circle.dy;
        circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size
        ) {
          circles.current.splice(i, 1);
          circles.current.push(circleParams());
        } else {
          context.current!.beginPath();
          context.current!.arc(
            circle.x + circle.translateX,
            circle.y + circle.translateY,
            circle.size,
            0,
            2 * Math.PI
          );
          context.current!.fillStyle = `rgba(0, 219, 233, ${circle.alpha})`;
          context.current!.fill();
        }
      });

      mouse.current.x += (mousePosition.current.x - mouse.current.x) / ease;
      mouse.current.y += (mousePosition.current.y - mouse.current.y) / ease;
      
      animationFrameId = requestAnimationFrame(render);
    }

    render();

    const handleResize = () => initCanvas();
    const handleMouseMove = (e: globalThis.MouseEvent) => onMouseMove(e);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [initCanvas, onMouseMove, ease, staticity, circleParams]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
