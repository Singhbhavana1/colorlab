import { useState, useEffect } from "react"

function RandomColor({setColor }) {
    useEffect(() => {
        generateRandomRGB();
    }, []);
    const generateRandomRGB = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const rgb = { r, g, b };
        // console.log("Random RGB:", r, g, b);
 if (setColor) setColor(rgb);
    };

    return (
        <div className="mt-5 ">
            <button
                onClick={generateRandomRGB}
                className="px-4 w-full py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-900 transition"
            ><div>

                </div>
                Generate Random Color
            </button>
        </div>
    );
}

export default RandomColor;