"use client";

import { forwardRef, useRef, useState, useEffect, useMemo } from "react";
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
      size * 0.5,
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const [logo, setLogo] = useState(null);
  useEffect(() => {
    new THREE.TextureLoader().load("./assets/MRCB&W.png", setLogo);
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
              <group
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, cardHeight / 2 + 0.25, 0]}
              >
                <Text
                  position={[-0.6, 0.25, -0.18]}
                  fontSize={0.08}
                  color="#111"
                  anchorX="left"
                  anchorY="middle"
                >
                  Ryan Cook
                </Text>
                <Text
                  position={[-0.6, 0.16, -0.18]}
                  fontSize={0.045}
                  color="blue"
                  anchorX="left"
                  anchorY="middle"
                >
                  Software Developer
                </Text>
                <Text
                  position={[-0.6, 0.08, -0.18]}
                  fontSize={0.045}
                  color="#555"
                  anchorX="left"
                  anchorY="middle"
                >
                  TheSikworks@gmail.com
                </Text>
                <Text
                  position={[-0.6, 0.001, -0.18]}
                  fontSize={0.045}
                  color="#555"
                  anchorX="left"
                  anchorY="middle"
                >
                  https://github.com/Sikboy79
                </Text>
                <Text
                  position={[-0.6, -0.09, -0.18]}
                  fontSize={0.025}
                  color="#555"
                  anchorX="left"
                  anchorY="middle"
                >
                  https://my-portfolio-five-sigma-0yof84ggh5.vercel.app/#projects
                </Text>
                <Text
                  position={[-0.4, -0.3, -0.18]}
                  fontSize={0.045}
                  color="#555"
                  anchorX="left"
                  anchorY="middle"
                >
                  "Inhale problems, exhale solutions!"
                </Text>
                <mesh position={[0.36, 0.06, -0.18]}>
                  <planeGeometry args={[0.6, 0.6]} />
                  <meshBasicMaterial
                    map={logo}
                    alphaMap={fadeTexture}
                    transparent
                    depthWrite={false}
                  />
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
const Lid = forwardRef(({ open, width, depth, radius, textures }, ref) => {
  if (!textures) return null;
  const internalRef = useRef();
  const SPEED = 0.02;
  const [, , colorMap, displacementMap, normalMapDX, roughnessMap] = textures;

  useFrame(() => {
    if (!internalRef.current) return;
    const targetRotation = open ? -Math.PI * 0.9 : 0;
    internalRef.current.rotation.x +=
      (targetRotation - internalRef.current.rotation.x) * SPEED;
  });

  return (
    <group ref={internalRef} position={[0, 0.25, -depth / 2]}>
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
          displacementMap={displacementMap}
          displacementScale={0.005}
          metalness={0}
        />
      </RoundedBox>
    </group>
  );
});

// ----- Hollow Box -----
function HollowBox({ width, height, depth, wallThickness, radius, textures }) {
  if (!textures) return null;
  const [, , colorMap, displacementMap, normalMapDX, roughnessMap] = textures;
  const wallRadius = 0.02;

  return (
    <group>
      {[
        {
          args: [width, height, wallThickness],
          pos: [0, height / 2, -depth / 2 + wallThickness / 2],
        },
        {
          args: [width, height, wallThickness],
          pos: [0, height / 2, depth / 2 - wallThickness / 2],
        },
        {
          args: [wallThickness, height, depth],
          pos: [-width / 2 + wallThickness / 2, height / 2, 0],
          r: wallRadius,
        },
        {
          args: [wallThickness, height, depth],
          pos: [width / 2 - wallThickness / 2, height / 2, 0],
          r: wallRadius,
        },
        {
          args: [width, wallThickness, depth],
          pos: [0, wallThickness / 2, 0],
          r: radius / 2,
        },
      ].map((b, i) => (
        <RoundedBox
          key={i}
          args={b.args}
          radius={b.r ?? radius}
          smoothness={4}
          position={b.pos}
        >
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

// ----- Camera Snapback -----
function CameraSnapback({ controlsRef }) {
  const snapBack = useRef(false);
  const originalPos = useRef(new THREE.Vector3(3, 2, 3));
  const originalTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleEnd = () => {
      snapBack.current = true;
    };
    controls.addEventListener("end", handleEnd);
    return () => controls.removeEventListener("end", handleEnd);
  }, [controlsRef]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls || !snapBack.current) return;

    controls.object.position.lerp(originalPos.current, 0.05);
    controls.target.lerp(originalTarget.current, 0.05);

    controls.update();

    if (controls.object.position.distanceTo(originalPos.current) < 0.01) {
      snapBack.current = false;
    }
  });

  return null;
}

// ----- BoxGroup with Fade-In & Hover -----
function BoxGroup({
  open,
  width,
  height,
  depth,
  wallThickness,
  cornerRadius,
  textures,
  onVisible,
}) {
  const groupRef = useRef();
  const fadeRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  const baseRotation = useRef(new THREE.Euler(0.1, 0.5, -0.08));

  useFrame(() => {
    if (!groupRef.current) return;

    /* ---------- Fade in  ---------- */
    if (fadeRef.current < 1) {
      fadeRef.current += 0.015;
      if (fadeRef.current >= 1 && onVisible) onVisible();
    }

    /* ---------- Hover zoom  ---------- */
    const targetScale = hovered ? 1.5 : .95;
    const s = groupRef.current.scale.x;
    const nextScale = s + (targetScale - s) * 0.05;

    groupRef.current.scale.setScalar(nextScale * fadeRef.current);

    /* ---------- Rotation ---------- */
    const rot = groupRef.current.rotation;

    const targetX = hovered
      ? baseRotation.current.x - 0.01
      : baseRotation.current.x;
    const targetY = hovered
      ? baseRotation.current.y + 0.1
      : baseRotation.current.y;
    const targetZ = hovered
      ? baseRotation.current.z - 0.01
      : baseRotation.current.z;

    rot.x += (targetX - rot.x) * 0.05;
    rot.y += (targetY - rot.y) * 0.05;
    rot.z += (targetZ - rot.z) * 0.05;
  });

  return (
    <group
      ref={groupRef}
      rotation={baseRotation.current}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* ---------- Soft shadow ---------- */}

      {/* center  */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.3, 0.005, 0.15]}>
        <planeGeometry args={[2.1, 0.75]} />
        <meshBasicMaterial
          transparent
          depthWrite={false}
          opacity={0.18}
          color="black"
        />
      </mesh>

      {/* mid blur */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.3, 0.004, 0.15]}>
        <planeGeometry args={[2.4, 0.9]} />
        <meshBasicMaterial
          transparent
          depthWrite={false}
          opacity={0.1}
          color="black"
        />
      </mesh>

      {/* outer blur */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.3, 0.003, 0.15]}>
        <planeGeometry args={[2.8, 1.1]} />
        <meshBasicMaterial
          transparent
          depthWrite={false}
          opacity={0.05}
          color="black"
        />
      </mesh>

      <HollowBox
        width={width}
        height={height}
        depth={depth}
        wallThickness={wallThickness}
        radius={cornerRadius}
        textures={textures}
      />

      <Lid
        open={open}
        width={width}
        depth={depth}
        radius={cornerRadius}
        textures={textures}
      />

      <Cards />
    </group>
  );
}

// ----- Main Component -----
export default function BusinessCardHolder() {
  const [open, setOpen] = useState(false);
  const [boxVisible, setBoxVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [textures, setTextures] = useState(null);
  const controlsRef = useRef();
  const lidRef = useRef();

  const width = 1.7;
  const depth = 1;
  const height = 0.25;
  const wallThickness = 0.05;
  const cornerRadius = 0.05;
  const popupTimer = useRef(null);

  const triggerPopup = () => {
    setShowPopup(true);

    clearTimeout(popupTimer.current);
    popupTimer.current = setTimeout(() => {
      setShowPopup(false);
    }, 2000); // 2 seconds
  };

  // Auto-open box after 2s
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

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
          [
            loadedTextures[2],
            loadedTextures[4],
            loadedTextures[5],
            loadedTextures[3],
          ].forEach((t) => {
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            t.repeat.set(2, 1);
          });
          setTextures(loadedTextures);
        }
      });
    });
  }, []);

  return (
    <div
      style={{
        width: "90vw",
        height: "90vh",
        margin: "0 auto",
        position: "relative",
      }}
    >
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
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[2, 15, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={20}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />

          <BoxGroup
            open={open}
            width={width}
            height={height}
            depth={depth}
            wallThickness={wallThickness}
            cornerRadius={cornerRadius}
            textures={textures}
            onVisible={() => {
              setBoxVisible(true);
              setShowPopup(true);
              setTimeout(() => setShowPopup(false), 2000);
            }}
          />

          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            enableRotate
            enableDamping
            dampingFactor={0.08}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />
          <CameraSnapback controlsRef={controlsRef} />
        </Canvas>
      )}
    </div>
  );
}
