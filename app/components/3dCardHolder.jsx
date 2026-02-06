"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

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
    if (!ctx) throw new Error("Could not get 2D context");
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.25,
      size / 2,
      size / 2,
      size * 0.5
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const [logo, setLogo] = useState(null);
  useEffect(() => {
    new THREE.TextureLoader().load("/MRCB&W.png", setLogo);
  }, []);

  return (
    <>
      {[...Array(cardCount)].map((_, i) => {
        const yPos = baseY + i * (cardHeight + 0.002);
        return (
          <group key={i} position={[0, yPos, 0]}>
            <mesh>
              <boxGeometry args={[1.4, cardHeight, 0.8]} />
              <meshStandardMaterial color="#fff" />
            </mesh>

            {i === 0 && logo && (
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

// ----- Lid -----
function Lid({ open, width, depth, radius, textures }) {
  if (!textures) return null;
  const ref = useRef();
  const SPEED = 0.02;

  useFrame(() => {
    if (!ref.current) return;
    const targetRotation = open ? -Math.PI * 0.9 : 0;
    ref.current.rotation.x += (targetRotation - ref.current.rotation.x) * SPEED;
  });

  const [, , colorMap, displacementMap, normalMapDX, roughnessMap] = textures;

  return (
    <group ref={ref} position={[0, 0.25, -depth / 2]}>
      <RoundedBox args={[width, 0.1, depth]} radius={radius} smoothness={4} position={[0, 0, depth / 2]}>
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMapDX}
          roughnessMap={roughnessMap}
          displacementMap={displacementMap}
          displacementScale={0.005}
          metalness={0}
        />
      </RoundedBox>
    </group>
  );
}

// ----- Hollow Box -----
function HollowBox({ width, height, depth, wallThickness, radius, textures }) {
  if (!textures) return null;
  const [, , colorMap, displacementMap, normalMapDX, roughnessMap] = textures;
  const wallRadius = 0.02;

  return (
    <group>
      {[
        { args: [width, height, wallThickness], pos: [0, height / 2, -depth / 2 + wallThickness / 2] },
        { args: [width, height, wallThickness], pos: [0, height / 2, depth / 2 - wallThickness / 2] },
        { args: [wallThickness, height, depth], pos: [-width / 2 + wallThickness / 2, height / 2, 0], r: wallRadius },
        { args: [wallThickness, height, depth], pos: [width / 2 - wallThickness / 2, height / 2, 0], r: wallRadius },
        { args: [width, wallThickness, depth], pos: [0, wallThickness / 2, 0], r: radius / 2 },
      ].map((b, i) => (
        <RoundedBox key={i} args={b.args} radius={b.r ?? radius} smoothness={4} position={b.pos}>
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMapDX}
            roughnessMap={roughnessMap}
            displacementMap={displacementMap}
            displacementScale={0.005}
            metalness={0}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

// ----- BoxGroup with Zoom and Fade -----
function BoxGroup({ open, width, height, depth, wallThickness, cornerRadius, textures }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(0); // start at 0 to fade in

  // Fade in on load
  useEffect(() => {
    let start = null;
    const duration = 1000; // 1 second fade/scale
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setScale(progress);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    // Smooth hover scaling with easing
    const target = hovered ? 1.5 : 1;
    const eased = 0.1;
    groupRef.current.scale.x += (target - groupRef.current.scale.x) * eased;
    groupRef.current.scale.y += (target - groupRef.current.scale.y) * eased;
    groupRef.current.scale.z += (target - groupRef.current.scale.z) * eased;

    // Apply fade-in scale
    groupRef.current.scale.multiplyScalar(scale);
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <HollowBox
        width={width}
        height={height}
        depth={depth}
        wallThickness={wallThickness}
        radius={cornerRadius}
        textures={textures}
      />
      <Lid open={open} width={width} depth={depth} radius={cornerRadius} textures={textures} />
    </group>
  );
}

// ----- Main Component -----
export default function BusinessCardHolder() {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [textures, setTextures] = useState(null);

  const width = 1.8;
  const depth = 1;
  const height = 0.25;
  const wallThickness = 0.05;
  const cornerRadius = 0.05;

  // Automatically open box after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show drag popup after load
  useEffect(() => {
    if (textures) {
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [textures]);

  // Load textures
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const urls = [
      "/textures/wood/diagonal_parquet_arm_4k.jpg",
      "/textures/wood/diagonal_parquet_nor_gl_4k.jpg",
      "/textures/wood/diagonal_parquet_diff_4k.jpg",
      "/textures/wood/diagonal_parquet_disp_4k.jpg",
      "/textures/wood/diagonal_parquet_nor_dx_4k.jpg",
      "/textures/wood/diagonal_parquet_rough_4k.jpg",
    ];

    let loadedTextures = [];
    let loadedCount = 0;

    urls.forEach((url, i) => {
      loader.load(url, (tex) => {
        loadedTextures[i] = tex;
        loadedCount++;
        if (loadedCount === urls.length) {
          [loadedTextures[2], loadedTextures[4], loadedTextures[5], loadedTextures[3]].forEach((t) => {
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            t.repeat.set(2, 1);
          });
          setTextures(loadedTextures);
        }
      });
    });
  }, []);

  return (
    <div style={{ width: "90vw", height: "90vh", margin: "0 auto", position: "relative" }}>
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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

      {textures && (
        <Canvas shadows camera={{ position: [3, 2, 3], fov: 70 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 7.5]} intensity={0.8} castShadow />

          <BoxGroup
            open={open}
            width={width}
            height={height}
            depth={depth}
            wallThickness={wallThickness}
            cornerRadius={cornerRadius}
            textures={textures}
          />

          <Cards />

          <OrbitControls enableZoom={false} enablePan={false} enableRotate maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
        </Canvas>
      )}
    </div>
  );
}