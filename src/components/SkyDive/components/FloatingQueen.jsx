import React, { forwardRef } from "react";
import { Float } from "@react-three/drei";
import Scene from "../../../../public/ChessQueenModel/Scene"

const FloatingQueen = forwardRef(
  (
    {
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
          <Scene />
        </Float>
      </group>
    );
  }
);

FloatingQueen.displayName = "FloatingQueen";

export default FloatingQueen;
