"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ----- Lid -----
function Lid({ open, width, depth, radius }) {
  const lidRef = useRef();
  const SPEED = 0.02;

  const [
    armMap,
    normalMapGL,
    colorMap,
    displacementMap,
    normalMapDX,
    roughnessMap,
  ] = useTexture([
    "/textures/wood/diagonal_parquet_arm_4k.jpg",
    "/textures/wood/diagonal_parquet_nor_gl_4k.jpg",
    "/textures/wood/diagonal_parquet_diff_4k.jpg",
    "/textures/wood/diagonal_parquet_disp_4k.jpg",
    "/textures/wood/diagonal_parquet_nor_dx_4k.jpg",
    "/textures/wood/diagonal_parquet_rough_4k.jpg",
  ]);

  [colorMap, normalMapDX, roughnessMap, displacementMap].forEach((t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 1);
  });

  useFrame(() => {
    if (!lidRef.current) return;
    const targetRotation = open ? -Math.PI * 0.9 : 0;
    lidRef.current.rotation.x += (targetRotation - lidRef.current.rotation.x) * SPEED;
  });

  return (
    <group position={[0, 0.25, -depth / 2]} ref={lidRef}>
      <RoundedBox
        args={[width, 0.1, depth]}
        radius={radius}
        smoothness={4}
        position={[0, 0, depth / 2]}
      >
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMapDX}
          roughnessMap={roughnessMap}
          metalness={0}
          displacementMap={displacementMap}
          displacementScale={0.005}
        />
      </RoundedBox>
    </group>
  );
}

// ----- Hollow Box Base -----
function HollowBox({ width, height, depth, wallThickness, radius }) {
  const [armMap, normalMapGL, colorMap, displacementMap, normalMapDX, roughnessMap] = useTexture([
    "/textures/wood/diagonal_parquet_arm_4k.jpg",
    "/textures/wood/diagonal_parquet_nor_gl_4k.jpg",
    "/textures/wood/diagonal_parquet_diff_4k.jpg",
    "/textures/wood/diagonal_parquet_disp_4k.jpg",
    "/textures/wood/diagonal_parquet_nor_dx_4k.jpg",
    "/textures/wood/diagonal_parquet_rough_4k.jpg",
  ]);

  [colorMap, normalMapDX, roughnessMap, displacementMap].forEach((t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 1);
  });

  return (
    <group>
      <RoundedBox args={[width, height, wallThickness]} radius={radius} smoothness={4} position={[0, height / 2, -depth / 2 + wallThickness / 2]}>
        <meshStandardMaterial map={colorMap} normalMap={normalMapDX} roughnessMap={roughnessMap} metalness={0} displacementMap={displacementMap} displacementScale={0.005} />
      </RoundedBox>

      <RoundedBox args={[width, height, wallThickness]} radius={radius} smoothness={4} position={[0, height / 2, depth / 2 - wallThickness / 2]}>
        <meshStandardMaterial map={colorMap} normalMap={normalMapDX} roughnessMap={roughnessMap} metalness={0} displacementMap={displacementMap} displacementScale={0.005} />
      </RoundedBox>

      <RoundedBox args={[wallThickness, height, depth]} radius={0.02} smoothness={4} position={[-width / 2 + wallThickness / 2, height / 2, 0]}>
        <meshStandardMaterial map={colorMap} normalMap={normalMapDX} roughnessMap={roughnessMap} metalness={0} displacementMap={displacementMap} displacementScale={0.005} />
      </RoundedBox>

      <RoundedBox args={[wallThickness, height, depth]} radius={0.02} smoothness={4} position={[width / 2 - wallThickness / 2, height / 2, 0]}>
        <meshStandardMaterial map={colorMap} normalMap={normalMapDX} roughnessMap={roughnessMap} metalness={0} displacementMap={displacementMap} displacementScale={0.005} />
      </RoundedBox>

      <RoundedBox args={[width, wallThickness, depth]} radius={radius / 2} smoothness={4} position={[0, wallThickness / 2, 0]}>
        <meshStandardMaterial map={colorMap} normalMap={normalMapDX} roughnessMap={roughnessMap} metalness={0} displacementMap={displacementMap} displacementScale={0.005} />
      </RoundedBox>
    </group>
  );
}

// ----- Cards -----
function Cards() {
  const cardCount = 5;
  const cardHeight = 0.01;
  const baseY = 0.05;

  const fadeTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.25, size / 2, size / 2, size * 0.5);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const logo = useTexture("/MRCB&W.png");

  return (
    <>
      {[...Array(cardCount)].map((_, i) => {
        const yPosition = baseY + i * (cardHeight + 0.002);
        return (
          <group key={i} position={[0, yPosition, 0]}>
            <mesh>
              <boxGeometry args={[1.4, cardHeight, 0.8]} />
              <meshStandardMaterial color="#fff" />
            </mesh>

            {i === 0 && (
              <group rotation={[-Math.PI / 2, 0, 0]} position={[0, cardHeight / 2 + 0.25, 0]}>
                <Text position={[-0.6, 0.25, -0.18]} fontSize={0.08} color="#111" anchorX="left" anchorY="middle">
                  Ryan Cook
                </Text>
                <Text position={[-0.6, 0.16, -0.18]} fontSize={0.045} color="blue" anchorX="left" anchorY="middle">
                  Software Developer
                </Text>
                <Text position={[-0.6, 0.08, -0.18]} fontSize={0.045} color="#555" anchorX="left" anchorY="middle">
                  TheSikworks@gmail.com
                </Text>
                <Text position={[-0.6, 0.001, -0.18]} fontSize={0.045} color="#555" anchorX="left" anchorY="middle">
                  https://github.com/Sikboy79
                </Text>
                <Text position={[-0.6, -0.09, -0.18]} fontSize={0.045} color="#555" anchorX="left" anchorY="middle">
                  -Portfolio here-
                </Text>
                <Text position={[-0.4, -0.3, -0.18]} fontSize={0.045} color="#555" anchorX="left" anchorY="middle">
                  "Inhale problems, exhale solutions!"
                </Text>
                <mesh position={[0.36, 0.06, -0.18]}>
                  <planeGeometry args={[0.6, 0.6]} />
                  <meshBasicMaterial map={logo} alphaMap={fadeTexture} transparent depthWrite={false} />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </>
  );
}

// ----- Main Component -----
export default function BusinessCardHolder() {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const width = 1.8;
  const depth = 1;
  const height = 0.25;
  const wallThickness = 0.05;
  const cornerRadius = 0.05;

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 300, 1);
      setOpen(progress > 0.05);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: "90vw", height: "90vh", margin: "0 auto", position: "relative" }}>
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            zIndex: 10,
          }}
        >
          Drag to rotate
        </div>
      )}
      <Canvas shadows camera={{ position: [3, 2, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7.5]} intensity={0.8} castShadow />
        <HollowBox width={width} height={height} depth={depth} wallThickness={wallThickness} radius={cornerRadius} />
        <Lid open={open} width={width} depth={depth} radius={cornerRadius} />
        <Cards />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      </Canvas>
    </div>
  );
}