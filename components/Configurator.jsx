import React, { Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, delay } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  Html,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei";
import Model from "./Shirt";
import { state } from "../pages/state";
import { useContext } from "react";
import ColorPalette from "./ColorPalette";
import File from "./File";
import Image from "next/image";
import AI from "./ai";
import styles from "../styles/font.module.css";
import style from "../styles/glass.module.css";
const Configurator = () => {
  const [front, setfront] = useState(true);
  const [back, setback] = useState(false);

  const [select, setselect] = useState("");
  const [Aiclick, setAiclick] = useState(false);
  const [pickerclick, setpickerclick] = useState(false);
  const [fileclick, setfileclick] = useState(false);

  const { setisActive, color } = useContext(state);
  const shirt = {
    front: {
      y: 0,
      opacity: 1,
    },
  };

  const selectType = (select) => {
    switch (select) {
      case "picker":
        return <ColorPalette />;
      case "file":
        return <File />;
      case "ai":
        return <AI />;
      default:
        return null;
    }
  };
  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden justify-center">
      <motion.div
        key="panel"
        className={`${style.glass} absolute w-14 md:w-24 md:h-[22rem] h-72  z-20 rounded-lg shadow-lg ml-4`}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, type: "tween", delay: 0, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full flex flex-col items-center gap-10 justify-around ">
          <Image
            src="/picker.png"
            className="w-10 h-10 md:cursor-pointer"
            height={300}
            width={300}
            onClick={() => {
              setpickerclick(!pickerclick);
              setAiclick(false);
              setfileclick(false);
              setselect("picker");
            }}
            alt="picker"
          />
          <Image
            src="/filepick.png"
            className="w-10 h-10  md:cursor-pointer"
            height={300}
            width={300}
            onClick={() => {
              setfileclick(!fileclick);
              setAiclick(false);
              setpickerclick(false);
              setselect("file");
            }}
            alt="file"
          />
          <Image
            src="/Ai.png"
            className="w-12 h-12 md:cursor-pointer"
            height={300}
            width={300}
            onClick={() => {
              setAiclick(!Aiclick);
              setpickerclick(false);
              setfileclick(false);
              setselect("ai");
            }}
            alt="aiprompt"
          />
          <AnimatePresence>
            {(fileclick || Aiclick || pickerclick) && (
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                key={select}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: -10,
                  opacity: 0,
                  transition: { ease: "easeOut" },
                }}
                transition={{ type: "spring" }}
                className={`${style.glass} absolute w-56 h-[21rem] ml-[19rem] md:ml-[22rem] rounded-md shadow-md shadow-gray-100`}
              >
                {selectType(select)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className="h-screen"
        variants={shirt}
        animate="front"
        initial={{ y: 40, opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Canvas shadows>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <Environment preset="city" />

            <Html fullscreen zIndexRange={[0, 1]}>
              <div className="flex flex-col justify-between h-full">
                <div className="flex justify-end p-8 md:max-w-[90%] w-full mx-auto">
                  <button
                    className={` ${styles.kufam} underline underline-offset-8 text-xl decoration-[#C38658]`}
                    onClick={() => setisActive(false)}
                  >
                    GO BACK
                  </button>
                </div>
                <div className="flex gap-3 justify-between p-8 md:max-w-[90%] mx-auto w-full">
                  <div className="flex gap-3 ">
                    <button
                      className={front ? "font-semibold" : "font-thin"}
                      onClick={(e) => {
                        e.preventDefault();
                        setback(false);
                        setfront(true);
                      }}
                    >
                      Front
                    </button>
                    <button
                      className={back ? "font-semibold" : "font-thin"}
                      onClick={(e) => {
                        e.preventDefault();
                        setfront(false);
                        setback(true);
                      }}
                    >
                      Back
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const canvas = document.querySelector("canvas");
                      const dataURL = canvas.toDataURL("image/png");
                      const link = document.createElement("a");
                      const parent = document.createElement("div"); // create parent element
                      link.href = dataURL;
                      link.download = "canvas.png";
                      parent.appendChild(link); // append link to parent
                      document.body.appendChild(parent); // append parent to document body
                      link.click();
                      document.body.removeChild(parent); // remove parent instead of link
                    }}
                    className="bg-rose-50 p-2 rounded-md"
                  >
                    Download
                  </button>
                </div>
              </div>
            </Html>
            <AccumulativeShadows
              temporal
              frames={60}
              scale={100}
              rotation={[Math.PI / 10, 4.7, 5]}
              color={color}
              alphaTest={0.85}
              position={[0, 0, -7]}
            >
              <RandomizedLight
                amount={10}
                position={[10, 15, -20]}
                radius={10}
                intensity={1}
                ambient={0.8}
              />
            </AccumulativeShadows>
            {front && (
              <Center>
                <Model />
              </Center>
            )}
            {!front && (
              <Center>
                <Model rotation={[0, 91, 0]} />
              </Center>
            )}
          </Suspense>
        </Canvas>
      </motion.div>
    </div>
  );
};

export default Configurator;
