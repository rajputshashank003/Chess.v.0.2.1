import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import Scene from '../../public/ChessQueenModel/Scene';

function RotatingQueen() {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <Suspense fallback={null}>
      <group ref={ref}>
        <Scene scale={window.innerWidth < 600 ? 1.3 : 1.6} />
      </group>
    </Suspense>
  );
}

function ModelQueen() {
  return (
    <div className="h-[24rem]">
      <Canvas
        shadows
        camera={{ position: [30, 30, 56], fov: 30 }}
        style={{
          pointerEvents: "none",
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <Environment files="/hdr/field.hdr" />
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
          target={[0, 0, 0]}
        />
        <RotatingQueen />
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={1}
          scale={20}
          blur={10}
          far={1}
          color={"black"}
        />
      </Canvas>
    </div>
  );
}

export default ModelQueen;
