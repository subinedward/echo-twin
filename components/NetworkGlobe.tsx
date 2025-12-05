
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const NetworkGlobe: React.FC = () => {
    return (
        <section className="relative h-[800px] w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-start pt-24 border-t border-white/5">
            {/* 1. Typography Section (Top) */}
            <div className="relative z-20 text-center px-6 pointer-events-none mb-12">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-5xl md:text-7xl text-[#E5E5E5] mb-6"
                >
                    Infinite Uptime.
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="font-mono text-xs md:text-sm text-white/40 max-w-lg mx-auto leading-relaxed mb-8"
                >
                    Your Twin operates in every timezone. <br className="hidden md:block" />
                    Filtering noise in NYC while you sleep in Berlin.
                </motion.p>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto px-6 py-2 rounded-full border border-white/20 text-[10px] font-mono tracking-widest uppercase text-white hover:bg-white hover:text-black transition-colors"
                >
                    Explore the Network
                </motion.button>
            </div>

            {/* 2. Globe Visualization (Bottom) */}
            <div className="absolute bottom-0 w-full h-[600px] flex items-end justify-center perspective-container z-10 pointer-events-none">
                <GlobeCanvas />
                {/* Gradient Fade at bottom to blend into footer */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20" />
            </div>
        </section>
    );
};

// --- Globe Logic ---

interface CityNode {
    id: string;
    lat: number;
    lon: number;
    colorTheme: 'emerald' | 'amber' | 'orange' | 'blue' | 'purple';
    label: string;
}

const CITIES: CityNode[] = [
    { id: 'sf', lat: 45, lon: -100, colorTheme: 'emerald', label: 'SAN FRANCISCO' }, 
    { id: 'london', lat: 55, lon: -10, colorTheme: 'amber', label: 'LONDON' },
    { id: 'tokyo', lat: 35, lon: 140, colorTheme: 'orange', label: 'TOKYO' }, 
    { id: 'nyc', lat: 30, lon: -60, colorTheme: 'blue', label: 'NEW YORK' },
    { id: 'singapore', lat: 10, lon: 100, colorTheme: 'purple', label: 'SINGAPORE' },
];

const GlobeCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [projectedNodes, setProjectedNodes] = useState<{id: string, x: number, y: number, z: number}[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = container.clientWidth;
        let height = container.clientHeight;

        // Resize handler
        const resize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            // High DPI
            canvas.width = width * 2;
            canvas.height = height * 2;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(2, 2);
        };
        resize();
        window.addEventListener('resize', resize);

        // Globe Config
        // Center the globe below the viewport bottom to create a "Horizon" arc
        const GLOBE_RADIUS = width * 0.8; 
        const ROTATION_SPEED = 0.0005;
        let rotation = 0;

        // Animation Loop
        let animationId: number;
        
        const render = () => {
            rotation += ROTATION_SPEED;
            ctx.clearRect(0, 0, width, height);

            // Center of the globe (Pushing it down)
            const cx = width / 2;
            const cy = height + (GLOBE_RADIUS * 0.25); // Push down to show top arc

            // Drawing Settings
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // Faint lines
            ctx.lineWidth = 1;

            // --- 1. Draw Surface Highlights (Colored Tiles) ---
            // We draw these before the grid lines so they sit "under"
            CITIES.forEach(city => {
                const centerLat = city.lat;
                const centerLon = city.lon;
                
                // Define a patch area around the city (approx 20x20 degrees)
                const patchSize = 15;
                const latStart = centerLat - patchSize/2;
                const latEnd = centerLat + patchSize/2;
                const lonStart = centerLon - patchSize/2;
                const lonEnd = centerLon + patchSize/2;

                const themeColor = getThemeColorRgba(city.colorTheme);

                ctx.fillStyle = themeColor;
                ctx.beginPath();

                // Draw polygon for the patch
                // We'll approximate with 4 corners
                const corners = [
                    { lat: latStart, lon: lonStart },
                    { lat: latStart, lon: lonEnd },
                    { lat: latEnd, lon: lonEnd },
                    { lat: latEnd, lon: lonStart }
                ];

                let allVisible = true;
                corners.forEach((corner, i) => {
                    const coords = project3D(corner.lat, corner.lon, rotation, GLOBE_RADIUS, cx, cy);
                    if (coords.zTilt <= 0) allVisible = false; // Simple visibility check
                    
                    if (i === 0) ctx.moveTo(coords.x, coords.y);
                    else ctx.lineTo(coords.x, coords.y);
                });

                if (allVisible) {
                    ctx.closePath();
                    ctx.fill();
                }
            });


            // --- 2. Draw Grid Lines ---
            
            // Latitudes (Horizontal Circles)
            for (let lat = -20; lat <= 90; lat += 10) {
                const phi = (90 - lat) * (Math.PI / 180);
                const rLine = GLOBE_RADIUS * Math.sin(phi);
                const yLine = GLOBE_RADIUS * Math.cos(phi);
                
                let prevX: number | null = null;
                let prevY: number | null = null;

                ctx.beginPath();
                for (let theta = 0; theta <= Math.PI * 2.1; theta += 0.1) {
                    const rotTheta = theta + rotation;
                    // Project
                    const x3d = rLine * Math.cos(rotTheta);
                    const z3d = rLine * Math.sin(rotTheta);
                    
                    const TILT = 0.4; 
                    const yTilt = yLine * Math.cos(TILT) - z3d * Math.sin(TILT);
                    const zTilt = yLine * Math.sin(TILT) + z3d * Math.cos(TILT);
                    
                    const CAMERA_Z = 2000;
                    const scale = CAMERA_Z / (CAMERA_Z - zTilt);
                    const x2d = cx + x3d * scale;
                    const y2d = cy + yTilt * scale;

                    if (zTilt > -GLOBE_RADIUS * 0.4) {
                        if (prevX !== null) ctx.lineTo(x2d, y2d);
                        else ctx.moveTo(x2d, y2d);
                        prevX = x2d;
                        prevY = y2d;
                    } else {
                        prevX = null;
                        prevY = null;
                    }
                }
                ctx.stroke();
            }

            // Longitudes (Vertical Arcs)
            for (let lon = 0; lon < 360; lon += 20) {
                ctx.beginPath();
                let prevX: number | null = null;
                let prevY: number | null = null;

                // Only draw top half mostly
                for (let lat = -20; lat <= 90; lat += 5) {
                    const phi = (90 - lat) * (Math.PI / 180);
                    const theta = (lon * Math.PI / 180) + rotation;
                    
                    const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
                    const y = GLOBE_RADIUS * Math.cos(phi);
                    const z = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);

                    const TILT = 0.4;
                    const yTilt = y * Math.cos(TILT) - z * Math.sin(TILT);
                    const zTilt = y * Math.sin(TILT) + z * Math.cos(TILT);
                    
                    const CAMERA_Z = 2000;
                    const scale = CAMERA_Z / (CAMERA_Z - zTilt);
                    const x2d = cx + x * scale;
                    const y2d = cy + yTilt * scale;
                    
                    if (zTilt > -GLOBE_RADIUS * 0.4) {
                        if (prevX !== null) ctx.lineTo(x2d, y2d);
                        else ctx.moveTo(x2d, y2d);
                        prevX = x2d;
                        prevY = y2d;
                    } else {
                        prevX = null;
                        prevY = null;
                    }
                }
                ctx.stroke();
            }

            // --- 3. Project City Nodes ---
            const newProjectedNodes: any[] = [];
            CITIES.forEach(city => {
                const coords = project3D(city.lat, city.lon, rotation, GLOBE_RADIUS, cx, cy);
                
                // Visibility Check
                if (coords.zTilt > 0) {
                    newProjectedNodes.push({
                        id: city.id,
                        x: coords.x,
                        y: coords.y,
                        z: coords.zTilt
                    });
                }
            });
            setProjectedNodes(newProjectedNodes);

            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Helper to calculate 3D projection
    const project3D = (lat: number, lon: number, rotation: number, radius: number, cx: number, cy: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon * Math.PI / 180) + rotation;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        const TILT = 0.4;
        const yTilt = y * Math.cos(TILT) - z * Math.sin(TILT);
        const zTilt = y * Math.sin(TILT) + z * Math.cos(TILT);

        const CAMERA_Z = 2000;
        const scale = CAMERA_Z / (CAMERA_Z - zTilt);
        
        return {
            x: cx + x * scale,
            y: cy + yTilt * scale,
            zTilt: zTilt
        };
    };

    const getThemeColorRgba = (theme: string) => {
        switch(theme) {
            case 'emerald': return 'rgba(16, 185, 129, 0.15)'; // green-500
            case 'amber': return 'rgba(245, 158, 11, 0.15)'; // amber-500
            case 'orange': return 'rgba(249, 115, 22, 0.15)'; // orange-500
            case 'blue': return 'rgba(59, 130, 246, 0.15)'; // blue-500
            case 'purple': return 'rgba(168, 85, 247, 0.15)'; // purple-500
            default: return 'rgba(255, 255, 255, 0.1)';
        }
    };

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full">
            <canvas ref={canvasRef} className="block w-full h-full" />
            
            {/* Render React Nodes on top of Canvas coordinates */}
            {projectedNodes.map(node => {
                const city = CITIES.find(c => c.id === node.id);
                if (!city) return null;
                return (
                    <div 
                        key={node.id}
                        className="absolute transform -translate-x-1/2 -translate-y-full z-20 will-change-transform flex flex-col items-center"
                        style={{ 
                            left: node.x, 
                            top: node.y - 10, // Offset to sit on the "pin"
                        }}
                    >
                       <AudioWaveBubble theme={city.colorTheme} />
                       
                       {/* Label below the bubble */}
                       <motion.span 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="mt-2 text-[10px] font-mono tracking-widest text-white/50 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm"
                       >
                         {city.label}
                       </motion.span>
                    </div>
                );
            })}
        </div>
    );
};

// --- Audio Wave Bubble Component ---

const AudioWaveBubble: React.FC<{ theme: CityNode['colorTheme'] }> = ({ theme }) => {
    
    // Theme configurations matching the reference image style
    const themes = {
        emerald: {
            bg: 'bg-gradient-to-br from-emerald-500/20 to-emerald-900/40 border-emerald-500/30',
            bars: 'bg-emerald-400'
        },
        amber: {
            bg: 'bg-gradient-to-br from-amber-500/20 to-yellow-900/40 border-amber-500/30',
            bars: 'bg-amber-400'
        },
        orange: {
            bg: 'bg-gradient-to-br from-orange-500/20 to-red-900/40 border-orange-500/30',
            bars: 'bg-orange-400'
        },
        blue: {
            bg: 'bg-gradient-to-br from-sky-500/20 to-blue-900/40 border-sky-500/30',
            bars: 'bg-sky-400'
        },
        purple: {
            bg: 'bg-gradient-to-br from-purple-500/20 to-indigo-900/40 border-purple-500/30',
            bars: 'bg-purple-400'
        }
    };

    const currentTheme = themes[theme];

    return (
        <div className="relative group">
            {/* The Pill Bubble */}
            <div className={`
                relative
                backdrop-blur-md 
                ${currentTheme.bg}
                border px-4 py-2.5 rounded-full shadow-lg
                flex items-center justify-center gap-1 min-w-[80px]
            `}>
                {/* Audio Bars Animation */}
                <div className="flex items-center gap-[3px] h-4">
                    {[...Array(7)].map((_, i) => (
                        <div 
                            key={i}
                            className={`w-1 rounded-full ${currentTheme.bars} shadow-[0_0_8px_currentColor]`}
                            style={{
                                animation: `equalizer ${0.8 + Math.random() * 0.5}s infinite ease-in-out`,
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            </div>
            
            {/* The Beak/Triangle pointing down */}
            <div className={`
                absolute left-1/2 -bottom-1.5 -translate-x-1/2 
                w-0 h-0 
                border-l-[6px] border-l-transparent
                border-r-[6px] border-r-transparent
                border-t-[6px] border-t-white/20
                filter drop-shadow-sm
            `}></div>
             
             {/* Add global style for keyframes to ensure it works */}
            <style>{`
                @keyframes equalizer {
                    0%, 100% { height: 4px; opacity: 0.5; }
                    50% { height: 14px; opacity: 1; }
                }
            `}</style>
        </div>
    );
};
