import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Mesh } from 'three';

const DeckModel: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 0.2, 2]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
  );
};

export default DeckModel;