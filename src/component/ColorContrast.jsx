import { useState, useEffect } from "react";
import { fetchColorComplimentry } from "../services/colorApi";

function ColorContrast() {
  // ✅ Initialize hexCode directly from localStorage
  const stored = localStorage.getItem("selectedColor");
  const initialHex = stored ? JSON.parse(stored).hex?.replace("#", "") : null;

  const [mode, setMode] = useState("complement"); // default contrast mode
  const [colors, setColors] = useState([]);
  const [hexCode, setHexCode] = useState(initialHex);

  // ✅ Fetch colors whenever mode or hexCode changes
 // ✅ Listen for changes in localStorage from RightSide
useEffect(() => {
  const handleStorageUpdate = () => {
    const stored = localStorage.getItem("selectedColor");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.hex) {
        setHexCode(parsed.hex.replace("#", ""));
      }
    }
  };

  window.addEventListener("localStorageUpdate", handleStorageUpdate);

  // Clean up listener on unmount
  return () => {
    window.removeEventListener("localStorageUpdate", handleStorageUpdate);
  };
}, []);

  // Fetch API whenever hexCode or mode changes
  useEffect(() => {
    if (!hexCode) return;

    const loadColors = async () => {
      try {
        const data = await fetchColorComplimentry(hexCode, mode);
        if (data?.colors) {
          setColors(data.colors);
        }
      } catch (err) {
        console.error("Failed to fetch colors:", err);
      }
    };

    loadColors();
  }, [hexCode, mode]);

  const handleChange = (e) => {
    setMode(e.target.value.toLowerCase());
  };

  return (
    <div className="dark:text-white h-52">
      <div>
        <h3 className="text-xl font-semibold text-center my-2">
          Color Contrast (Attention Grabbers)
        </h3>
        <p className="text-sm text-center">
          (for CTA buttons, warnings, highlights, dashboards)
        </p>

        <select
          className="border dark:bg-gray-500 my-2 p-1 rounded-xl w-full"
          value={mode}
          onChange={handleChange}
        >
          <option value="complement">Complement</option>
          <option value="analogic-complement">Analogic-complement</option>
        </select>

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
    </div>
  );
}

export default ColorContrast;
