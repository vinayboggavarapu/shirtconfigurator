import React, { useRef, useState, useEffect } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useContext } from "react";
import { state } from "../pages/state";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export default function Model(props) {
  useGLTF.preload("../pages/shirt_baked_collapsed.glb");
  const { nodes, materials } = useGLTF("../pages/shirt_baked_collapsed.glb");
  const { logoColor, file, color, fulltexture } = useContext(state);
  let shirtlogo;
  const [texture, setistexture] = useState(false);
  let applytexture;

  const { isActive } = useContext(state);
  let model = useRef();
  let target;
  let windowWidth = 1024;

  if (typeof window !== "undefined") {
    windowWidth = window.innerWidth;
  }
  const mobile = windowWidth <= 1024;
  if (isActive) {
    if (mobile) {
      target = [0, 0, 1.1];
    } else {
      target = [0, 0, 0.65];
    }
  } else {
    if (mobile) {
      target = [0, 0, 1.2];
    } else {
      target = [0, 0, 0.4];
    }
  }

  useEffect(() => {
    if (fulltexture !== "") {
      setistexture(true);
      console.log(fulltexture);
    }
  }, [fulltexture]);

  applytexture = useTexture("/react.png");

  file === ""
    ? (shirtlogo = useTexture("/react.png"))
    : (shirtlogo = useTexture(file));

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, color, 0.25, delta); //To apply color with ease
    easing.dampE(
      model.current.rotation, //To move with cursor
      [state.pointer.x / 10, -state.pointer.y / 7, 0],
      0.25,
      delta
    );
    easing.damp3(state.camera.position, target, 0.25, delta); //To scale base on clientwidth
  });

  return (
    <group {...props} dispose={null} key={color} ref={model}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      >
        <Decal
          map={shirtlogo}
          scale={0.15}
          position={[0, 0.03, 0.1]}
          rotation={[0, 0, 0]}
          map-anisotropy={16}
          depthTest={false}
          depthWrite={true}
          color={logoColor}
        />
        {/* {texture && (
          <Decal
            map={applytexture}
            scale={0.8}
            position={[0, 0, -0.28]}
            rotation={[0, 0, 0]}
          />
        )} */}
      </mesh>
    </group>
  );
}
