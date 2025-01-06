import { Cloud, Clouds, Environment, Text } from "@react-three/drei";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingQueen from "./components/FloatingQueen";

gsap.registerPlugin(ScrollTrigger);

export default function Scene2({ sentence = "VIDEO call ,AUDIO call ,CHAT ,Ai hint ,custom games", flavor }) {
  const groupRef = useRef(null);
  const canRef = useRef(null);
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const cloudsRef = useRef(null);
  const wordsRef = useRef(null);

  const ANGLE = 75 * (Math.PI / 180);

  const getXPosition = (distance) => distance * Math.cos(ANGLE);
  const getYPosition = (distance) => distance * Math.sin(ANGLE);

  const getXYPositions = (distance) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  useEffect(() => {
    if (
      !canRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current ||
      !cloudsRef.current ||
      !wordsRef.current
    )
      return;

    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, {
      ...getXYPositions(-4),
    });

    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      { ...getXYPositions(7), z: 2 }
    );

    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });

    // Infinite cloud movement
    const DISTANCE = 15;
    const DURATION = 6;

    gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      delay: DURATION / 2,
      duration: DURATION,
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 3,
      },
    });

    scrollTl
      // .to(".skydive",{
      //   backgroundColor: "#C0F0F5",
      //   overwrite: "auto",
      //   duration: 0.1,
      // })
      .to(".features_title", {
        opacity: 0,        
        y: -20,            
        duration: 0.3,
        ease: "back.out(1.7)" 
      })
      .to(cloudsRef.current.position, { z: 0, duration: 0.3 }, 0)
      .to(canRef.current.position, {
        x: 0,
        y: 0, 
        duration: 0.5,
        ease: "back.out(1.7)",
      })
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getXYPositions(-7), z: -7 },
          ],
          stagger: 0.3,
        },
        0
      )
      .to(canRef.current.position, {
        ...getXYPositions(4),
        duration: 0.5,
        ease: "back.in(1.7)",
      })
      .to(cloudsRef.current.position, { z: 7, duration: 0.5 })
      // .to(".skydive",{
      //   backgroundColor: "transparent",
      //   overwrite: "auto",
      //   duration: 0.1,
      // });
  }, []);

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <FloatingQueen
          ref={canRef}
          flavor={flavor}
          rotationIntensity={0}
          floatIntensity={3}
          floatSpeed={3}
        >
          <pointLight intensity={30} color="#8C0413" decay={2} />
        </FloatingQueen>
      </group>

      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#F97315" />}
      </group>

      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment preset="sunset" />
    </group>
  );
}

function ThreeText({ sentence, color = "white" }) {
  const words = sentence.toUpperCase().split(",");

  const material = new THREE.MeshLambertMaterial();
  return words.map((word, wordIndex) => (
    <Text
      key={`${wordIndex}-${word}`}
      scale={window.innerWidth < 600 ? 0.2 : 0.7}
      color={color}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={"center"}
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,._?'"
    >
      {word}
    </Text>
  ));
}
