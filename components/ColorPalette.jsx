import React, { useState } from "react";
import { SketchPicker } from "react-color";
import styles from "../styles/colorpicker.module.css";
import { useContext } from "react";
import { state } from "../pages/state";

const ColorPalette = () => {
  const { color, setcolor } = useContext(state);
  const { logoColor, setlogoColor } = useContext(state);
  const [logo, setlogo] = useState(false);
  const [shirt, setshirt] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center h-fit p-2">
      <div className="flex justify-around w-full">
        <p
          className={
            logo
              ? `rounded-lg  shadow px-5 bg-gray-100 shadow-blue-200 cursor-pointer`
              : `rounded-lg font-thin cursor-pointer`
          }
          onClick={() => {
            setlogo(true);
            setshirt(false);
          }}
        >
          logo color
        </p>
        <p
          className={
            shirt
              ? `rounded-lg  shadow px-5 bg-gray-100 shadow-blue-200 cursor-pointer`
              : `rounded-lg font-thin cursor-pointer`
          }
          onClick={() => {
            setlogo(false);
            setshirt(true);
          }}
        >
          shirt color
        </p>
      </div>
      {logo && (
        <SketchPicker
          disableAlpha
          className={styles.picker}
          color={logoColor}
          onChange={(c) => setlogoColor(c.hex)}
        />
      )}
      {shirt && (
        <SketchPicker
          disableAlpha
          className={styles.picker}
          color={color}
          onChange={(c) => setcolor(c.hex)}
        />
      )}
    </div>
  );
};

export default ColorPalette;
