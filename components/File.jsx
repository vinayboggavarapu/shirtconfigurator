import React, { useState } from "react";
import { useContext } from "react";
import { state } from "../pages/state";

const File = () => {
  const { fileName, setfileName, setfulltexture, setfile } = useContext(state);
  const [logo, setlogo] = useState(true);
  const [texture, settexture] = useState(false);

  return (
    <div className="flex flex-col justify-between h-full p-5">
      {/* <p className="font-extralight">No file selected</p> */}
      <div className="flex flex-col h-fit mt-14">
        <input
          type="file"
          id="upload"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            setfileName(e.target.files[0]);
          }}
        />
        <label
          htmlFor="upload"
          className="bg-gray-300 shadow-inner rounded-md p-2 w-fit"
        >
          Upload
        </label>
        <p className="font-extralight">
          {fileName === "" ? "No file chosen" : fileName.name}
        </p>
      </div>
      <div className="flex justify-evenly">
        <p
          onClick={() => {
            setlogo(false);
            settexture(true);
            setfulltexture(URL.createObjectURL(fileName));
          }}
          className={
            texture
              ? `rounded-lg  shadow px-5 bg-gray-100 shadow-blue-200 cursor-pointer`
              : `rounded-lg font-thin cursor-pointer`
          }
        >
          Texture
        </p>

        <p
          onClick={() => {
            setfile(URL.createObjectURL(fileName));
            setlogo(true);
            settexture(false);
          }}
          className={
            logo
              ? `rounded-lg  shadow px-5 bg-gray-100 shadow-blue-200 cursor-pointer`
              : `rounded-lg font-thin cursor-pointer`
          }
        >
          Logo
        </p>
      </div>
    </div>
  );
};

export default File;
