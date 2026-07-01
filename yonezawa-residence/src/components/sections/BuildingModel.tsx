"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  scrollProgress: number;
}

const COLOR_DIM = new THREE.Color(0.15, 0.13, 0.08);
const COLOR_LOBBY = new THREE.Color(0.8, 0.66, 0.3);
const COLOR_STD = new THREE.Color(0.9, 0.93, 0.97);
const COLOR_PREM = new THREE.Color(0.85, 0.7, 0.3);
const COLOR_NIGHT = new THREE.Color(0.78, 0.64, 0.28);
const COLOR_BASE = new THREE.Color(0.1, 0.09, 0.06);

const EMISSIVE_OFF = new THREE.Color(0, 0, 0);
const EMISSIVE_LOBBY = new THREE.Color(0.4, 0.3, 0.05);
const EMISSIVE_STD = new THREE.Color(0.15, 0.18, 0.25);
const EMISSIVE_PREM = new THREE.Color(0.4, 0.28, 0.02);
const EMISSIVE_NIGHT = new THREE.Color(0.35, 0.25, 0.02);

export default function BuildingModel({ scrollProgress }: Props) {
  const groupRef = useRef<THREE.Group>(null);

  const floors = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({ y: i * 0.6 + 0.3, floor: i + 1 }));
  }, []);

  const getFloorColor = (floor: number) => {
    const p = scrollProgress;
    if (p < 0.15) return COLOR_DIM;
    if (p < 0.35 && floor <= 3) return COLOR_LOBBY;
    if (p < 0.55 && floor >= 4 && floor <= 7) return COLOR_STD;
    if (p < 0.75 && floor >= 8) return COLOR_PREM;
    if (p >= 0.75) return COLOR_NIGHT;
    return COLOR_BASE;
  };

  const getFloorEmissive = (floor: number) => {
    const p = scrollProgress;
    if (p < 0.15) return EMISSIVE_OFF;
    if (p < 0.35 && floor <= 3) return EMISSIVE_LOBBY;
    if (p < 0.55 && floor >= 4 && floor <= 7) return EMISSIVE_STD;
    if (p < 0.75 && floor >= 8) return EMISSIVE_PREM;
    if (p >= 0.75) return EMISSIVE_NIGHT;
    return EMISSIVE_OFF;
  };

  useFrame((_, delta) => {
    if (groupRef.current && scrollProgress < 0.1) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -3.6, 0]}>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[2.4, 0.3, 2.4]} />
        <meshStandardMaterial color={0x1a1a26} roughness={0.8} />
      </mesh>

      {floors.map(({ y, floor }) => (
        <group key={floor}>
          <mesh position={[0, y, 0]}>
            <boxGeometry args={[2, 0.52, 1.6]} />
            <meshStandardMaterial
              color={getFloorColor(floor)}
              emissive={getFloorEmissive(floor)}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[0, y + 0.05, 0.81]}>
            <boxGeometry args={[1.6, 0.28, 0.02]} />
            <meshStandardMaterial
              color={0x0a0a1a}
              emissive={getFloorEmissive(floor)}
              emissiveIntensity={0.8}
              roughness={0.1}
              metalness={0.5}
            />
          </mesh>
          <mesh position={[0, y + 0.05, -0.81]}>
            <boxGeometry args={[1.6, 0.28, 0.02]} />
            <meshStandardMaterial
              color={0x0a0a1a}
              emissive={getFloorEmissive(floor)}
              emissiveIntensity={0.8}
              roughness={0.1}
              metalness={0.5}
            />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[1.4, 0.4, 1.1]} />
        <meshStandardMaterial color={0x1a1a26} roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 7.8, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.6]} />
        <meshStandardMaterial color={0xc9a84c} emissive={0x3a2a05} roughness={0.4} metalness={0.6} />
      </mesh>

      {scrollProgress >= 0.75 && (
        <>
          <mesh position={[-4, -1.5, -5]} rotation={[0, 0, 0.1]}>
            <coneGeometry args={[2, 3, 6]} />
            <meshStandardMaterial color={0x0d0d1a} roughness={1} />
          </mesh>
          <mesh position={[4.5, -2, -6]} rotation={[0, 0, -0.05]}>
            <coneGeometry args={[2.5, 2.5, 6]} />
            <meshStandardMaterial color={0x0d0d1a} roughness={1} />
          </mesh>
          <mesh position={[1.5, -2.5, -7]}>
            <coneGeometry args={[3, 2, 6]} />
            <meshStandardMaterial color={0x0d0d1a} roughness={1} />
          </mesh>
        </>
      )}
    </group>
  );
}
