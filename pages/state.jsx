import { createContext, useState } from "react";

export const state = createContext();

const Provider = ({ children }) => {
  const [isActive, setisActive] = useState(false);
  const [color, setcolor] = useState("#FFFFFF");
  const [fulltexture, setfulltexture] = useState("");
  const [logoColor, setlogoColor] = useState("#9B9B9B");
  const [file, setfile] = useState("");
  const [fileName, setfileName] = useState("");
  return (
    <state.Provider
      value={{
        setisActive,
        isActive,
        color,
        setcolor,
        file,
        setfile,
        logoColor,
        setlogoColor,
        fileName,
        setfileName,
        fulltexture,
        setfulltexture,
      }}
    >
      {children}
    </state.Provider>
  );
};

export default Provider;
