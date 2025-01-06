import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import Scene from "../../public/ChessBoardModel/Scene.jsx";

function RotatingChessModel() {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <Suspense fallback={null}>
      <group ref={ref}>
        <Scene />
      </group>
    </Suspense>
  );
}

function ChessBoardModel() {
  const [width , setWidth] = useState(window.innerWidth);
  return (
    <div className={`h-[35rem] max-sm:h-[20rem]  overflow-visible`}
      style={{ width: `${width}px` }}
    >
      <Canvas
        shadows
        camera={{ position: [30, 30, 56], fov: 6 }}
        gl={{ antialias: false, pixelRatio: Math.min(window.devicePixelRatio, 2) }}
        style={{
          position: 'relative',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          overflow: 'hidden',
          zIndex: 99
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1}
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <Environment preset="sunset" />
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
          target={[0, 0, 0]}
        />
        <RotatingChessModel />
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={1}
          scale={20}
          blur={10}
          far={1}
          color={"white"}
        />
      </Canvas>
    </div>
  );
}

export default ChessBoardModel;
