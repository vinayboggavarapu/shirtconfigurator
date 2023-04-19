import React from "react";
import { useContext } from "react";
import { state } from "../state";
import styles from "../../styles/font.module.css";
import Image from "next/image";
import Model from "./Shirt";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { AnimatePresence, easeIn, motion } from "framer-motion";

const Land = () => {
  const { setisActive } = useContext(state);

  return (
    <div className="flex h-screen items-center md:max-w-[90%] mx-auto overflow-hidden ">
      {/* Upper */}
      <div className="flex flex-col justify-between w-full h-[100%] p-8 ">
        <header className="flex justify-between ">
          <h2 className={`${styles.trainOne} text-3xl `}>SC</h2>
          <button
            onClick={() => setisActive(true)}
            className={`${styles.kufam} text-xl underline underline-offset-8 decoration-[#C38658]`}
          >
            CREATE
          </button>
        </header>
        {/* Center */}

        <div className="relative flex items-center h-full ">
          <AnimatePresence>
            <motion.section
              key="heroquote"
              initial={{ scaleZ: 5, opacity: 0 }}
              animate={{ scaleZ: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "backInOut" }}
            >
              <h2 className={`${styles.satisfy} text-[2.5rem] md:text-6xl`}>
                <span className={`text-[#F57F25] text-6xl  font-bold`}>
                  Style Shirts
                </span>{" "}
                Your Way
              </h2>
              <p
                className={`text-[2rem] md:text-3xl mt-8 md:w-2/3 font-thin leading-10`}
              >
                "Style is a way to say who you are without having to speak."{" "}
                <span>- Rachel Zoe</span>
              </p>
            </motion.section>
          </AnimatePresence>
          <AnimatePresence>
            <motion.div
              className="absolute h-full w-full opacity-60 md:opacity-100 md:w-2/4 z-[-1] md:right-0"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", type: "tween", duration: 1 }}
            >
              <Canvas>
                <ambientLight intensity={0.7} />
                <Environment preset="sunset" />
                <Model />
              </Canvas>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom*/}
        <div className="flex justify-between">
          <p className={`${styles.kufam} text-xl`}>COLORIZE</p>
          <p className={`${styles.kufam} text-xl`}>CUSTOMIZE</p>
        </div>
      </div>
    </div>
  );
};

export default Land;
