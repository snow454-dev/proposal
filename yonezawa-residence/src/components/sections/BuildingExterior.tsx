"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";

// ── Dimensions ──────────────────────────────────────────────
const BW = 2.8;   // building width
const BD = 1.6;   // building depth
const LH = 0.80;  // lobby/ground floor height
const FH = 0.44;  // regular floor height
const NF = 11;    // regular floors above lobby (total 12)
const FZ = BD / 2; // front face Z = 0.8

const TOTAL_H = LH + NF * FH; // 0.8 + 4.84 = 5.64

// Front window X positions (4 per floor)
const WIN_X = [-0.90, -0.30, 0.30, 0.90] as const;
// Window size
const WW = 0.42, WH = FH * 0.62, WD = 0.03;
// Side window Z positions (2 per side)
const SIDE_Z = [-0.46, 0.46] as const;

const WALL = "#dcdce8";
const GLASS = "#1a2a3a";
const BALC = "#c8c8d2";

// ── Instanced helpers ────────────────────────────────────────

function FrontWindows() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = NF * WIN_X.length;

  useEffect(() => {
    if (!ref.current) return;
    const m = new THREE.Matrix4();
    let idx = 0;
    for (let i = 0; i < NF; i++) {
      const y = LH + i * FH + FH / 2 + 0.02;
      for (const wx of WIN_X) {
        m.setPosition(wx, y, FZ + 0.016);
        ref.current.setMatrixAt(idx++, m);
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[WW, WH, WD]} />
      <meshStandardMaterial color={GLASS} metalness={0.88} roughness={0.04} />
    </instancedMesh>
  );
}

function SideWindows() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = NF * SIDE_Z.length * 2;

  useEffect(() => {
    if (!ref.current) return;
    const m = new THREE.Matrix4();
    let idx = 0;
    for (let i = 0; i < NF; i++) {
      const y = LH + i * FH + FH / 2 + 0.02;
      for (const wz of SIDE_Z) {
        // left side
        m.setPosition(-BW / 2 - 0.016, y, wz);
        ref.current.setMatrixAt(idx++, m);
        // right side
        m.setPosition(BW / 2 + 0.016, y, wz);
        ref.current.setMatrixAt(idx++, m);
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[WD, WH, 0.38]} />
      <meshStandardMaterial color={GLASS} metalness={0.88} roughness={0.04} />
    </instancedMesh>
  );
}

function BalconySlabs() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = NF;

  useEffect(() => {
    if (!ref.current) return;
    const m = new THREE.Matrix4();
    for (let i = 0; i < NF; i++) {
      m.setPosition(0, LH + i * FH, FZ + 0.22);
      ref.current.setMatrixAt(i, m);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[BW + 0.3, 0.05, 0.44]} />
      <meshStandardMaterial color={BALC} roughness={0.55} metalness={0.05} />
    </instancedMesh>
  );
}

function BalconyRailings() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = NF;

  useEffect(() => {
    if (!ref.current) return;
    const m = new THREE.Matrix4();
    for (let i = 0; i < NF; i++) {
      m.setPosition(0, LH + i * FH + FH * 0.84, FZ + 0.44);
      ref.current.setMatrixAt(i, m);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[BW + 0.3, 0.024, 0.024]} />
      <meshStandardMaterial color="#a0a0b4" roughness={0.5} metalness={0.45} />
    </instancedMesh>
  );
}

// ── Main export ──────────────────────────────────────────────

export default function BuildingExterior() {
  return (
    <group position={[0, -2.82, 0]}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#07071a" roughness={0.9} metalness={0.06} />
      </mesh>

      {/* Main building body */}
      <mesh position={[0, TOTAL_H / 2, 0]}>
        <boxGeometry args={[BW, TOTAL_H, BD]} />
        <meshStandardMaterial color={WALL} roughness={0.68} metalness={0.06} />
      </mesh>

      {/* ── Lobby / Ground floor ── */}
      {/* Lobby glass curtain wall */}
      <mesh position={[0, LH * 0.46, FZ + 0.016]}>
        <boxGeometry args={[BW - 0.18, LH * 0.88, 0.03]} />
        <meshStandardMaterial color={GLASS} metalness={0.92} roughness={0.02} transparent opacity={0.90} />
      </mesh>
      {/* Entrance canopy */}
      <mesh position={[0, LH * 0.92, FZ + 0.54]}>
        <boxGeometry args={[1.9, 0.045, 1.08]} />
        <meshStandardMaterial color="#e2e2ee" roughness={0.3} metalness={0.25} />
      </mesh>
      {/* Canopy columns */}
      {([-0.72, 0.72] as const).map((x, i) => (
        <mesh key={i} position={[x, LH * 0.46, FZ + 1.08]}>
          <boxGeometry args={[0.055, LH * 0.9, 0.055]} />
          <meshStandardMaterial color="#c8c8d6" roughness={0.5} />
        </mesh>
      ))}
      {/* Lobby accent band above entrance */}
      <mesh position={[0, LH, FZ + 0.01]}>
        <boxGeometry args={[BW + 0.02, 0.06, 0.04]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* ── Instanced floor elements ── */}
      <FrontWindows />
      <SideWindows />
      <BalconySlabs />
      <BalconyRailings />

      {/* ── Window glow lights ── */}
      {Array.from({ length: Math.ceil(NF / 2) }, (_, i) => {
        const y = LH + i * 2 * FH + FH / 2;
        return (
          <pointLight
            key={i}
            position={[0, y, 0.22]}
            intensity={0.38}
            color="#ffcc88"
            distance={3.2}
            decay={2}
          />
        );
      })}
      {/* Lobby light */}
      <pointLight position={[0, LH * 0.45, 0.3]} intensity={0.55} color="#ffe4aa" distance={3} decay={2} />

      {/* ── Rooftop ── */}
      <mesh position={[0, TOTAL_H + 0.16, 0]}>
        <boxGeometry args={[BW, 0.32, BD]} />
        <meshStandardMaterial color="#c4c4d0" roughness={0.5} />
      </mesh>
      {/* Penthouse */}
      <mesh position={[0, TOTAL_H + 0.55, 0]}>
        <boxGeometry args={[BW * 0.68, 0.7, BD * 0.68]} />
        <meshStandardMaterial color={WALL} roughness={0.5} />
      </mesh>
      {/* Penthouse windows */}
      {([-0.5, 0.5] as const).map((wx, i) => (
        <mesh key={i} position={[wx, TOTAL_H + 0.55, BD * 0.34 + 0.016]}>
          <boxGeometry args={[0.5, 0.48, WD]} />
          <meshStandardMaterial color={GLASS} metalness={0.88} roughness={0.04} />
        </mesh>
      ))}
      {/* Antenna */}
      <mesh position={[0, TOTAL_H + 1.12, 0]}>
        <boxGeometry args={[0.055, 0.64, 0.055]} />
        <meshStandardMaterial color="#8888a0" roughness={0.6} />
      </mesh>
      {/* Gold rooftop band */}
      <mesh position={[0, TOTAL_H + 0.005, FZ + 0.01]}>
        <boxGeometry args={[BW + 0.02, 0.048, 0.04]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* ── Surrounding buildings (silhouettes) ── */}
      {[
        { x: -5.5, z: -2.0, h: 2.2, w: 2.2 },
        { x: -6.2, z:  1.8, h: 1.4, w: 1.6 },
        { x:  5.4, z: -1.5, h: 3.0, w: 2.4 },
        { x:  5.9, z:  2.2, h: 1.8, w: 1.8 },
        { x: -3.5, z: -5.2, h: 1.6, w: 1.8 },
        { x:  2.6, z: -5.5, h: 2.0, w: 1.6 },
        { x:  0.0, z: -7.0, h: 1.2, w: 3.0 },
      ].map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.w * 0.7]} />
          <meshStandardMaterial color="#0d0d20" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}
