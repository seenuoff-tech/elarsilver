'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RingGeometryConfig } from '../data/shopProducts';

interface ThreeRingProps {
  geometryConfig: RingGeometryConfig;
  isHovered: boolean;
  colorTheme: string;
  finish?: 'glossy' | 'matte' | 'vintage';
}

export default function ThreeRing({ geometryConfig, isHovered, colorTheme, finish = 'glossy' }: ThreeRingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bandRef = useRef<THREE.Mesh>(null);
  const sweepLightRef = useRef<THREE.DirectionalLight>(null);
  const reflectionLightRef = useRef<THREE.DirectionalLight>(null);
  const particlesRef = useRef<THREE.Points>(null);

  let metalColor = colorTheme || '#D1D5DB';
  const isBlackRuthenium = colorTheme === '#212121';

  // Generate 40 3D particle positions once on mount
  const particleCount = 40;
  const [particlePositions] = useState(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 3.4;     // X coordinates
      arr[i * 3 + 1] = (Math.random() - 0.5) * 3.4; // Y coordinates
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3.4; // Z coordinates
    }
    return arr;
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Fixed orientation instead of continuous rotation
    if (groupRef.current) {
      groupRef.current.rotation.x = 0.2;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.z = 0;

      const targetScale = isHovered ? 1.15 : 0.95;
      const currentScale = groupRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      groupRef.current.scale.set(nextScale, nextScale, nextScale);
    }

    // Dynamic reflection sweep light
    if (sweepLightRef.current) {
      const sweepRange = isHovered ? 8 : 4;
      const sweepSpeed = isHovered ? 3 : 1;
      sweepLightRef.current.position.x = Math.sin(t * sweepSpeed) * sweepRange;
    }

    // DYNAMIC REFLECTION SYSTEM: Map pointer coordinates to spotlight position
    if (reflectionLightRef.current) {
      // state.pointer provides normalized mouse coordinates (-1 to 1)
      const targetX = state.pointer.x * 6;
      const targetY = state.pointer.y * 6 + 3;
      reflectionLightRef.current.position.x = THREE.MathUtils.lerp(reflectionLightRef.current.position.x, targetX, 0.08);
      reflectionLightRef.current.position.y = THREE.MathUtils.lerp(reflectionLightRef.current.position.y, targetY, 0.08);
    }

    // Slowly drift the WebGL particle cloud in 3D space
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0015;
      particlesRef.current.rotation.x += 0.0006;
    }
  });

  const renderDiamonds = () => {
    if (!geometryConfig.hasDiamonds || geometryConfig.diamondCount === 0) return null;

    const diamondArr = [];
    const count = geometryConfig.diamondCount;
    const radius = geometryConfig.radius;
    const tubularRadius = geometryConfig.tubularRadius;
    const dSize = geometryConfig.diamondSize;

    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: isBlackRuthenium && geometryConfig.diamondLayout === 'solitaire' ? '#111111' : '#FFFFFF',
      emissive: isBlackRuthenium ? '#000000' : '#222222',
      roughness: 0.0,
      metalness: 0.1,
      transmission: 0.9,
      ior: 2.4,
      side: THREE.DoubleSide,
      flatShading: true,
    });

    if (geometryConfig.diamondLayout === 'solitaire') {
      diamondArr.push(
        <group key="solitaire" position={[0, radius + tubularRadius * 0.6, 0]}>
          {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const px = Math.cos(rad) * (dSize * 1.1);
            const pz = Math.sin(rad) * (dSize * 1.1);
            return (
              <mesh key={idx} position={[px, 0.1, pz]}>
                <cylinderGeometry args={[0.015, 0.015, dSize * 1.3, 8]} />
                <meshStandardMaterial color={metalColor} metalness={1.0} roughness={0.1} />
              </mesh>
            );
          })}
          <mesh position={[0, dSize * 0.5, 0]} material={diamondMaterial}>
            <octahedronGeometry args={[dSize, 1]} />
          </mesh>
        </group>
      );
    } else if (geometryConfig.diamondLayout === 'halo') {
      diamondArr.push(
        <group key="halo-center" position={[0, radius + tubularRadius * 0.6, 0]}>
          <mesh position={[0, dSize * 0.4, 0]} material={diamondMaterial}>
            <octahedronGeometry args={[dSize, 1]} />
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const hRadius = dSize * 1.3;
            const hx = Math.cos(angle) * hRadius;
            const hz = Math.sin(angle) * hRadius;
            return (
              <mesh key={i} position={[hx, dSize * 0.2, hz]} material={diamondMaterial}>
                <sphereGeometry args={[dSize * 0.35, 8, 8]} />
              </mesh>
            );
          })}
        </group>
      );
    } else if (geometryConfig.diamondLayout === 'pave') {
      for (let i = 0; i < count; i++) {
        const angle = (i - (count - 1) / 2) * 0.16 + Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        diamondArr.push(
          <mesh
            key={`pave-${i}`}
            position={[x, y, 0]}
            rotation={[0, 0, angle - Math.PI / 2]}
            material={diamondMaterial}
          >
            <sphereGeometry args={[dSize, 8, 8]} />
          </mesh>
        );
      }
    }

    return diamondArr;
  };

  let ringRoughness = isHovered ? 0.02 : 0.08;
  let ringClearcoat = 1.0;
  let ringReflectivity = 1.0;
  let ringColor = metalColor;

  if (finish === 'matte') {
    ringColor = '#E5E7EB';
    ringRoughness = 0.55;
    ringClearcoat = 0.05;
    ringReflectivity = 0.15;
  } else if (finish === 'vintage') {
    ringColor = '#6A7072';
    ringRoughness = 0.28;
    ringClearcoat = 0.35;
    ringReflectivity = 0.65;
  }

  const silverMaterial = new THREE.MeshPhysicalMaterial({
    color: ringColor,
    metalness: 1.0,
    roughness: ringRoughness,
    clearcoat: ringClearcoat,
    clearcoatRoughness: 0.02,
    reflectivity: ringReflectivity,
    flatShading: geometryConfig.facets,
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      
      {/* 1. Base Sweep Light simulating reflections */}
      <directionalLight
        ref={sweepLightRef}
        position={[2, 4, 3]}
        intensity={isHovered ? 2.0 : 1.0}
        color="#FFFFFF"
      />
      
      {/* 2. DYNAMIC REFLECTION: Mouse reactive spotlight highlight */}
      <directionalLight
        ref={reflectionLightRef}
        position={[0, 3, 4]}
        intensity={isHovered ? 3.0 : 1.5}
        color="#F3F4F6"
      />
      
      {/* 3. Base fill light */}
      <spotLight
        position={[-5, 10, -5]}
        angle={0.25}
        penumbra={1}
        intensity={1.8}
        color="#E5E7EB"
      />

      {/* Main Ring Model Group */}
      <group ref={groupRef} rotation={[0.2, 0, 0]}>
        {/* Silver Band Mesh */}
        <mesh ref={bandRef} material={silverMaterial}>
          <torusGeometry
            args={[
              geometryConfig.radius,
              geometryConfig.tubularRadius,
              geometryConfig.radialSegments,
              geometryConfig.tubularSegments,
            ]}
          />
        </mesh>

        {/* Set Diamonds */}
        {renderDiamonds()}
      </group>

      {/* ADVANCED PARTICLE EFFECTS: WebGL 3D Silver Point Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          color={isBlackRuthenium ? '#7F7F7F' : '#E5E4E2'}
          transparent
          opacity={0.65}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </>
  );
}
