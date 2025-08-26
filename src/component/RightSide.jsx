import { useEffect, useState } from "react";
import SearchColor from "./SearchColor";
import RandomColor from "./RandomColor";
import { fetchColorNumber } from "../services/colorApi";
import { Copy } from "lucide-react";
import CopyComponent from "./CopyComponent";

function RightSide() {
    const [colorData, setColorData] = useState();
    const [copied, setCopied] = useState();

    const getColorData = async (rgbOrData) => {

        if (rgbOrData?.r !== undefined && rgbOrData?.g !== undefined && rgbOrData?.b !== undefined) {
            const data = await fetchColorNumber(rgbOrData.r, rgbOrData.g, rgbOrData.b);
            setColorData(data);
        } else {
            setColorData(rgbOrData);
        }
    };

    useEffect(() => {
        if (colorData) {
            const colorInfo = {
                name: colorData?.name?.value || colorData?.name,
                hex: colorData?.hex?.value || colorData?.hex
            };
            localStorage.setItem("selectedColor", JSON.stringify(colorInfo));
            window.dispatchEvent(new Event("localStorageUpdate"));
        }

    }, [colorData]);

    return (
        <div className="sm:w-1/2  sm:mx-10 mt-5">
            <div className="flex justify-between">
                <SearchColor setColor={getColorData} className="w-3/5" />

            </div>

            {colorData && (
                <div className="mt-5">
                    <div className="flex items-center gap-4">
                        <div className="mt-5 flex justify-center">
                            {colorData.image?.named ? (
                                <img
                                    src={colorData.image.named}
                                    alt={colorData.name?.value || "Color"}
                                    className="h-18 w-18 rounded-full"
                                />
                            ) : (
                                <div
                                    className="h-32 w-32 rounded-full border border-gray-300"
                                    style={{ backgroundColor: colorData.hex || "#ffffff" }}
                                />
                            )}
                        </div>


                        <h3 className="text-base  dark:text-white"><span className="font-bold">Color Name :</span>{` ${colorData?.name?.value || colorData?.name}`}</h3>
                    </div>

                    <div className="grid grid-cols-2 text-base dark:text-white my-2 gap-4 justify-between ">
                        <p className="flex justify-between items-center"><span className="font-bold">Hex:</span> {colorData?.hex?.value || colorData?.hex} <CopyComponent copied={colorData?.hex?.value || colorData?.hex} /></p>
                        <p className="flex justify-between items-center">
                            <span className="font-bold"> RGB:</span> {colorData?.rgb?.r}, {colorData?.rgb?.g}, {colorData?.rgb?.b}<CopyComponent />
                        </p>
                    </div>
                    <div className="flex justify-between items-center text-base dark:text-white">
                        <p className="">
                            <span className="font-bold">HSL : </span>
                            {`hsl(${colorData?.hsl?.h}, ${colorData?.hsl?.s}%, ${colorData?.hsl?.l}%)`}
                        </p>
                        <CopyComponent copied={`hsl(${colorData?.hsl?.h}, ${colorData?.hsl?.s}%, ${colorData?.hsl?.l}%)`} />
                    </div>

                </div>
            )}

            <RandomColor setColor={getColorData} className="w-full" />
        </div>
    );
}

export default RightSide;
