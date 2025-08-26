import { Copy } from 'lucide-react'
import { fetchColorNumber } from '../services/colorApi'
import { useState, useEffect } from 'react'
import CopyComponent from './CopyComponent'

function LeftSide() {

    // ✅ Initialize state from localStorage if exists, otherwise default 0
    const [colorRed, setColorRed] = useState(() => {
        const stored = localStorage.getItem("colorRGB");
        return stored ? JSON.parse(stored).r : 0;
    });
    const [colorGreen, setColorGreen] = useState(() => {
        const stored = localStorage.getItem("colorRGB");
        return stored ? JSON.parse(stored).g : 0;
    });
    const [colorBlue, setColorBlue] = useState(() => {
        const stored = localStorage.getItem("colorRGB");
        return stored ? JSON.parse(stored).b : 0;
    });
    const [colorName, setColorName] = useState('');

    // ✅ Save RGB values whenever sliders change
    useEffect(() => {
        const rgbData = { r: colorRed, g: colorGreen, b: colorBlue };
        localStorage.setItem("colorRGB", JSON.stringify(rgbData));
    }, [colorRed, colorGreen, colorBlue]);

    const getColorData = async () => {
        const data = await fetchColorNumber(colorRed, colorGreen, colorBlue);
        const colorNameOfLeft = data?.name?.value || "Custom Color";
        setColorName(colorNameOfLeft);
        return colorNameOfLeft;
    };

    const rgbToHex = (value) => {
        let hex = Number(value).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    const hexToSingleValue = (hex, index) => parseInt(hex.slice(index, index + 2), 16);

    const fullHexValue = (r, g, b) => {
        return rgbToHex(r) + rgbToHex(g) + rgbToHex(b);
    }

    const handleSaveColor = async () => {
        const name = await getColorData();
        const hex = fullHexValue(colorRed, colorGreen, colorBlue);

        const colorInfo = {
            name: name || "Custom Color",
            hex: `#${hex}`,
            r: colorRed,
            g: colorGreen,
            b: colorBlue
        };

        localStorage.setItem("selectedColor", JSON.stringify(colorInfo));
        window.dispatchEvent(new Event("localStorageUpdate"));
    };

    return (
        <div className='sm:mt-10 sm:w-1/2'>
            <div className="sm:pl-10">
                <div className="flex justify-center">
                <div className=" h-[200px] w-[200px] rounded-full
      shadow-[0_8px_20px_rgba(0,0,0,0.8)]  
      dark:shadow-[-5px_-5px_20px_#3b82f6] ">
                    <div className='shadow-2xl' style={{
                        backgroundColor: `rgb(${colorRed},${colorGreen},${colorBlue})`,
                        height: 200, width: 200, borderRadius: 100
                    }} />
                </div></div>

                {/* Red Slider */}
                <div className="flex flex-col">
                    <label htmlFor="red" className='sm:text-xl text-black dark:text-white font-semibold sm:font-bold py-2'>Red</label>
                    <div className="flex justify-between items-center">
                        <input
                            className='w-72 h-2 rounded-lg appearance-none cursor-pointer'
                            value={colorRed}
                            type="range"
                            onChange={(e) => setColorRed(Number(e.target.value))}
                            min={0} max={255}
                        />
                        <p className='sm:text-xl dark:text-white'>{colorRed}</p>
                    </div>
                </div>

                {/* Green Slider */}
                <div className="flex flex-col">
                    <label htmlFor="green" className='text-xl text-black dark:text-white font-bold py-2'>Green</label>
                    <div className="flex justify-between items-center">
                        <input
                            className='w-72  h-2 rounded-lg appearance-none cursor-pointer'
                            value={colorGreen}
                            type="range"
                            onChange={(e) => setColorGreen(Number(e.target.value))}
                            min={0} max={255}
                        />
                        <p className='text-xl dark:text-white'>{colorGreen}</p>
                    </div>
                </div>

                {/* Blue Slider */}
                <div className="flex flex-col">
                    <label htmlFor="blue" className='text-xl text-black dark:text-white font-bold py-2'>Blue</label>
                    <div className="flex justify-between items-center">
                        <input
                            className='w-72  h-2 rounded-lg appearance-none cursor-pointer'
                            value={colorBlue}
                            type="range"
                            onChange={(e) => setColorBlue(Number(e.target.value))}
                            min={0} max={255}
                        />
                        <p className='text-xl dark:text-white'>{colorBlue}</p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <h3 className='text-base py-4 dark:text-white'>Hex Code: #{fullHexValue(colorRed, colorGreen, colorBlue)}</h3>
                    <CopyComponent copied={fullHexValue(colorRed, colorGreen, colorBlue)} />
                </div>

                <div className="">
                    <button
                        onClick={handleSaveColor}
                        className='w-full border rounded-xl py-2 bg-blue-700 text-white'
                    >
                        Get Contrast/Combination Color
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LeftSide;
