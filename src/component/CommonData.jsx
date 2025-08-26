import { useEffect, useState } from "react";

function CommonData() {
  const [colorData, setColorData] = useState(null);

  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem("selectedColor");
      if (stored) setColorData(JSON.parse(stored));
    };

    loadData();

    window.addEventListener("localStorageUpdate", loadData);
    window.addEventListener("storage", loadData); 
    return () => {
      window.removeEventListener("localStorageUpdate", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  if (!colorData) return <p>No color selected</p>;

  return (
    <div className="flex items-center dark:text-white">
      <div
        className="h-8 w-8 rounded my-2 mr-4 border"
        style={{ backgroundColor: colorData.hex }}
      />
      <h4 className="text-xl">Color Name: {colorData.name}</h4>
    </div>
  );
}

export default CommonData;
