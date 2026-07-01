"use client";
import { useMemo } from "react";
import * as THREE from "three";

type V3 = [number, number, number];

function WireBox({
  pos,
  size,
  opacity,
}: {
  pos: V3;
  size: V3;
  opacity: number;
}) {
  const geo = useMemo(() => {
    const [w, h, d] = size;
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
  }, [size[0], size[1], size[2]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <lineSegments position={pos} geometry={geo}>
      <lineBasicMaterial color="#c9a84c" transparent opacity={opacity} />
    </lineSegments>
  );
}

export default function RoomModel() {
  return (
    <group>
      {/* Floor – subtle reflective plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[8.2, 12.2]} />
        <meshStandardMaterial color="#c9a84c" transparent opacity={0.05} metalness={0.95} roughness={0.08} />
      </mesh>

      {/* === SHELL === */}
      {/* Outer walls */}
      <WireBox pos={[-4, 1.4, 0]}  size={[0.04, 2.8, 12]} opacity={0.30} />
      <WireBox pos={[4,  1.4, 0]}  size={[0.04, 2.8, 12]} opacity={0.30} />
      <WireBox pos={[0,  1.4, 5]}  size={[8,    2.8, 0.04]} opacity={0.25} />
      <WireBox pos={[0,  1.4, -5]} size={[8,    2.8, 0.04]} opacity={0.65} />
      {/* Ceiling */}
      <WireBox pos={[0, 2.78, 0]}  size={[8,    0.04, 12]}  opacity={0.15} />

      {/* Interior partition – living / private zone divide */}
      <WireBox pos={[-2, 1.4, -1.5]} size={[0.04, 2.8, 3.5]}  opacity={0.45} />
      <WireBox pos={[2,  1.4, -1.5]} size={[0.04, 2.8, 3.5]}  opacity={0.45} />
      <WireBox pos={[0,  1.4, -1.5]} size={[4,    2.8, 0.04]} opacity={0.45} />

      {/* Window frames – front (balcony) wall */}
      <WireBox pos={[-2.2, 1.4, -4.98]} size={[2.8, 2.0, 0.06]} opacity={0.85} />
      <WireBox pos={[2.2,  1.4, -4.98]} size={[2.8, 2.0, 0.06]} opacity={0.85} />

      {/* Balcony railings */}
      <WireBox pos={[0, 1.0, -5.7]} size={[6,    0.04, 0.04]} opacity={0.9} />
      <WireBox pos={[0, 0.6, -5.7]} size={[6,    0.04, 0.04]} opacity={0.65} />
      <WireBox pos={[0, 0.2, -5.7]} size={[6,    0.04, 0.04]} opacity={0.40} />
      {/* Balcony floor edge */}
      <WireBox pos={[0, 0.0, -5.7]} size={[6.4,  0.04, 1.4]}  opacity={0.25} />

      {/* === LIVING ROOM === */}
      {/* L-sofa main seat */}
      <WireBox pos={[-1.6, 0.35, 0.8]}  size={[3.2, 0.70, 1.0]}  opacity={0.90} />
      {/* Sofa back */}
      <WireBox pos={[-1.6, 0.75, 1.28]} size={[3.2, 0.60, 0.14]} opacity={0.85} />
      {/* Sofa arm-return (L-part) */}
      <WireBox pos={[-3.1, 0.35, -0.1]} size={[1.0, 0.70, 2.4]}  opacity={0.75} />
      {/* Coffee table */}
      <WireBox pos={[-1.2, 0.20, -0.3]} size={[1.6, 0.40, 0.9]}  opacity={0.95} />
      {/* TV cabinet */}
      <WireBox pos={[2.5, 0.55, 0.0]}   size={[2.8, 1.1, 0.5]}   opacity={0.60} />

      {/* === DINING === */}
      {/* Dining table */}
      <WireBox pos={[1.5, 0.74, -2.5]}  size={[2.0, 1.48, 1.0]}  opacity={0.88} />
      {/* Chairs (4) */}
      <WireBox pos={[0.6, 0.48, -2.0]}  size={[0.45, 0.96, 0.45]} opacity={0.72} />
      <WireBox pos={[1.5, 0.48, -2.0]}  size={[0.45, 0.96, 0.45]} opacity={0.72} />
      <WireBox pos={[2.4, 0.48, -2.0]}  size={[0.45, 0.96, 0.45]} opacity={0.72} />
      <WireBox pos={[1.5, 0.48, -3.0]}  size={[0.45, 0.96, 0.45]} opacity={0.60} />

      {/* === KITCHEN === */}
      {/* Counter */}
      <WireBox pos={[3.3, 0.9, -3.4]}   size={[1.2, 1.8, 2.8]}   opacity={0.78} />
      {/* Counter bar top (overhang) */}
      <WireBox pos={[2.5, 1.75, -4.6]}  size={[2.8, 0.08, 0.8]}  opacity={0.70} />
      {/* Kitchen island */}
      <WireBox pos={[1.4, 0.9, -3.5]}   size={[1.1, 1.8, 0.8]}   opacity={0.82} />

      {/* === BEDROOM === */}
      {/* Bed frame */}
      <WireBox pos={[-2.6, 0.28, -3.5]} size={[2.2, 0.56, 3.0]}  opacity={0.88} />
      {/* Headboard */}
      <WireBox pos={[-2.6, 0.80, -4.9]} size={[2.2, 1.04, 0.12]} opacity={0.82} />
      {/* Nightstands */}
      <WireBox pos={[-1.4, 0.35, -3.5]} size={[0.5, 0.70, 0.5]}  opacity={0.68} />
      <WireBox pos={[-3.7, 0.35, -3.5]} size={[0.5, 0.70, 0.5]}  opacity={0.68} />
      {/* Wardrobe */}
      <WireBox pos={[-3.6, 1.1, -1.7]}  size={[0.8, 2.2, 1.4]}   opacity={0.55} />
    </group>
  );
}
