"use client";

import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';

interface SnowEffectProps {
    speedMultiplier?: number;
}

export function SnowEffect({ speedMultiplier = 1 }: SnowEffectProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                setDimensions({ width: offsetWidth, height: offsetHeight });
            }
        };

        // Initial measurement
        updateDimensions();

        const observer = new ResizeObserver(updateDimensions);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const snowflakes = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 8,
        size: Math.random() * 5 + 2,
        // Store speed (pixels per second) instead of fixed duration
        // Random speed between 50 and 100 px/s seems reasonable for snow
        // Multiplicamos por speedMultiplier para ajustar la velocidad (e.g. 0.5 para más lento)
        speed: (Math.random() * 50 + 50) * speedMultiplier,
        drift: (Math.random() - 0.5) * 100,
    })), [speedMultiplier]);

    if (dimensions.height === 0) return (
        <div ref={containerRef} className="absolute inset-0 z-5 overflow-hidden pointer-events-none" />
    );

    return (
        <div ref={containerRef} className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
            {snowflakes.map((flake) => {
                // Calculate duration based on height and speed
                const duration = dimensions.height / flake.speed;

                return (
                    <motion.div
                        key={flake.id}
                        className="absolute bg-white rounded-full"
                        style={{
                            left: `${flake.left}%`,
                            width: `${flake.size}px`,
                            height: `${flake.size}px`,
                            top: '-20px',
                            opacity: 0.8,
                        }}
                        animate={{
                            y: [0, dimensions.height + 40],
                            x: [0, flake.drift],
                            opacity: [0, 0.9, 0.9, 0],
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            delay: flake.animationDelay,
                            ease: 'linear',
                        }}
                    />
                );
            })}
        </div>
    );
}
