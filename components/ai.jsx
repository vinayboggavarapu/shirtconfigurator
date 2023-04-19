import React, { useState } from "react";
import { useContext } from "react";
import { state } from "../pages/state";

const Ai = () => {
  const [prompt, setprompt] = useState("");
  const [loading, setloading] = useState(false);
  const { setfile } = useContext(state);
  const handleClick = async () => {
    try {
      setloading(true);
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      const blob = await response.blob();
      if (state) {
        setfile(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <textarea
        placeholder="Enter your prompt here"
        rows={10}
        onChange={(e) => {
          setprompt(e.target.value);
        }}
        className="focus:border-none focus:outline-none w-full p-5 bg-transparent"
      />
      <button
        className="p-2 bg-gray-100 shadow shadow-blue-100 rounded-md w-full "
        type="button"
        onClick={() => {
          handleClick();
        }}
      >
        {loading ? "Searching" : "Search"}
      </button>
    </div>
  );
};

export default Ai;
