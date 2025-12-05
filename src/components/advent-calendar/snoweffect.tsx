"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function SnowEffect() {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
        const handleResize = () => setHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const snowflakes = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 8,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 5 + 8,
        drift: (Math.random() - 0.5) * 100,
    }));

    if (height === 0) return null;

    return (
        <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
            {snowflakes.map((flake) => (
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
                        y: [0, height + 40],
                        x: [0, flake.drift],
                        opacity: [0, 0.9, 0.9, 0],
                    }}
                    transition={{
                        duration: flake.duration,
                        repeat: Infinity,
                        delay: flake.animationDelay,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
}
