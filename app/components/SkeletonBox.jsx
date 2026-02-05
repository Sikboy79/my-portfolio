"use client";
import { RoundedBox } from "@react-three/drei";

export default function SkeletonBox({
  width = 1,
  height = 1,
  depth = 1,
  radius = 0.1,
  position = [0, 0, 0],
}) {
  return (
    <group position={position}>
      <RoundedBox args={[width, height, depth]} radius={radius} smoothness={4}>
        <meshStandardMaterial color="#999" />
      </RoundedBox>
    </group>
  );
}