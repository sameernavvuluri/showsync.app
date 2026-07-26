"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Environment, PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Maximize } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Generates theatre seats in an arc pattern
const generateSeats = () => {
  const seats = [];
  const rows = 10;
  const seatsPerRow = 16;
  const arcRadius = 15;
  
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < seatsPerRow; i++) {
      // Calculate angle for arc
      const angle = (i / (seatsPerRow - 1)) * Math.PI / 3 - Math.PI / 6;
      // Stagger seats in height and depth
      const x = Math.sin(angle) * (arcRadius + row * 1.5);
      const z = Math.cos(angle) * (arcRadius + row * 1.5) - arcRadius;
      const y = row * 0.4;
      
      const isRecliner = row < 2;
      const isPremium = row >= 2 && row < 5;
      
      let color = "#555555";
      if (isRecliner) color = "#b8860b"; // Gold/Yellowish for Recliner
      else if (isPremium) color = "#800080"; // Purple for Premium
      
      // Randomly book some seats
      const isBooked = Math.random() > 0.8;
      if (isBooked) color = "#222222";

      seats.push({
        id: `${row}-${i}`,
        position: [x, y, z] as [number, number, number],
        rotation: [0, -angle, 0] as [number, number, number],
        color,
        isBooked,
        label: `${String.fromCharCode(65 + row)}${i + 1}`,
        type: isRecliner ? 'Recliner' : isPremium ? 'Premium' : 'Standard'
      });
    }
  }
  return seats;
};

function Seat({ position, rotation, color, isBooked, label, type, onClick, isSelected }: any) {
  const [hovered, setHovered] = useState(false);
  const finalColor = isSelected ? "#e50914" : hovered && !isBooked ? "#ff4d4d" : color;

  return (
    <group position={position} rotation={rotation}>
      {/* Seat Base */}
      <mesh 
        castShadow 
        receiveShadow 
        position={[0, 0.25, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <boxGeometry args={[0.6, 0.5, 0.6]} />
        <meshStandardMaterial color={finalColor} roughness={0.7} />
      </mesh>
      
      {/* Backrest */}
      <mesh castShadow receiveShadow position={[0, 0.8, -0.2]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.2]} />
        <meshStandardMaterial color={finalColor} roughness={0.7} />
      </mesh>
      
      {/* Armrests */}
      <mesh castShadow position={[-0.35, 0.6, 0]}>
        <boxGeometry args={[0.1, 0.2, 0.6]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh castShadow position={[0.35, 0.6, 0]}>
        <boxGeometry args={[0.1, 0.2, 0.6]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

    </group>
  );
}

function CinemaScreen() {
  return (
    <group position={[0, 5, -10]}>
      {/* Screen frame */}
      <mesh castShadow receiveShadow position={[0, 0, -0.5]}>
        <boxGeometry args={[22, 11, 1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Screen surface */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
      {/* Projector Light Effect */}
      <spotLight 
        position={[0, 10, 20]} 
        angle={0.6} 
        penumbra={0.5} 
        intensity={2} 
        color="#ffffff" 
        castShadow
      />
      {/* Ambient glow from screen */}
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#abcdef" distance={20} />
      
      <Text
        position={[0, 0, 0.1]}
        fontSize={1}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        IMAX
      </Text>
    </group>
  );
}

export default function Theatre3DView() {
  const router = useRouter();
  const seats = useMemo(() => generateSeats(), []);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const handleSeatClick = (seat: any) => {
    if (seat.isBooked) return;
    setSelectedSeat(prev => prev === seat.id ? null : seat.id);
  };

  const selectedSeatData = seats.find(s => s.id === selectedSeat);

  return (
    <div className="w-full h-screen relative bg-[#050505]">
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-start pointer-events-none">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="pointer-events-auto bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white pointer-events-auto max-w-sm">
          <h1 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Maximize className="w-4 h-4 text-primary" />
            3D Theatre View
          </h1>
          <p className="text-sm text-white/60 mb-4">
            Drag to rotate the camera. Scroll to zoom. Click an available seat to preview its viewing angle.
          </p>
          
          {selectedSeatData ? (
            <div className="bg-primary/20 border border-primary/50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-lg text-primary">{selectedSeatData.label}</span>
                <span className="text-sm font-medium">{selectedSeatData.type}</span>
              </div>
              <p className="text-xs text-white/80">Distance to screen: ~{Math.abs(selectedSeatData.position[2] + 10).toFixed(1)}m</p>
              <Button className="w-full mt-3" size="sm">Confirm Seat</Button>
            </div>
          ) : (
            <div className="text-sm text-white/40 text-center py-2">No seat selected</div>
          )}
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 8, 25]} fov={50} />
        <OrbitControls 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minDistance={5}
          maxDistance={35}
        />
        
        <ambientLight intensity={0.2} />
        <Environment preset="city" />

        <CinemaScreen />

        <group position={[0, -2, 0]}>
          {/* Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>

          {/* Render Seats */}
          {seats.map((seat) => (
            <Seat 
              key={seat.id} 
              {...seat} 
              isSelected={selectedSeat === seat.id}
              onClick={() => handleSeatClick(seat)} 
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
}
