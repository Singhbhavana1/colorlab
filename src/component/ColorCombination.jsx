import { useState, useEffect } from "react";

import { fetchColorComplimentry } from "../services/colorApi";
export default function ColorCombination() {
  const [mode, setMode] = useState("monochrome");
  const [colors, setColors] = useState([]);
  const [hexCode, setHexCode] = useState(null);

  // ✅ Load hex code from localStorage on mount
  useEffect(() => {
    const handleStorageUpdate = () => {
      const stored = localStorage.getItem("selectedColor");
      if (stored) {
        const parsed = JSON.parse(stored);
        setHexCode(parsed.hex?.replace("#", "")); // remove "#" for API

      }
    };
    window.addEventListener("localStorageUpdate", handleStorageUpdate);
    return () => {
      window.removeEventListener("localStorageUpdate", handleStorageUpdate)
    };
  }, []);

  // ✅ When mode or hexCode changes, fetch new colors
  useEffect(() => {
    if (!hexCode) return;

    const loadColors = async () => {
      const data = await fetchColorComplimentry(hexCode, mode);
      if (data?.colors) {
        setColors(data.colors);
      }
    };

    loadColors();
  }, [hexCode, mode]);

  const handleChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <div className="dark:text-white h-60">
      <div>
        <h3 className="text-xl font-semibold text-center">
          Color Harmony (Pairing / Blends)
        </h3>
        <p className="text-sm text-center">
          (for smooth UI, themes, gradients, branding)
        </p>

        <select
          className="border dark:bg-gray-500 my-2 p-2 rounded-xl w-full"
          value={mode}
          onChange={handleChange}
        >
          <option value="monochrome">Monochrome</option>
          <option value="monochrome-dark">Monochrome-dark</option>
          <option value="monochrome-light">Monochrome-light</option>
          <option value="analogic">Analogic</option>
          <option value="triad">Triad</option>
          <option value="quad">Quad</option>
        </select>
      </div>

      {/* Render the colors */}
      <div className="flex justify-center gap-2 mt-4">
        {colors.map((c, idx) => (
          <div
            key={idx}
            className="w-10 h-10 rounded shadow"
            style={{ backgroundColor: c.hex.value }}
            title={c.hex.value}
          />
        ))}
      </div>
    </div>
  );
}
