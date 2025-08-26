import { useState } from "react"
import { fetchColorName } from "../services/colorApi";

function SearchColor({setColor}){
const [name, setName]=useState();
const [colorData, setColorData] = useState(null); // API response

  const getColorDataByName = async () => {
    if (!name) return; 
    const data = await fetchColorName(name);
    console.log(data);
    if (setColor) setColor(data);
    setColorData(data);
  };
    return (
     <div className=" mt-5 w-full">
      <div className="flex items-center space-x-2">
        {/* Search Box */}
        <div className="flex w-full space-x-2">
          <div className="w-full flex justify-between bg-white dark:bg-gray-800 px-4 px-3 py-2 border rounded-xl " >
          <input 
            type="text" 
            placeholder="Search by color name" 
            className="focus:outline-none dark:bg-gray-800 dark:caret-blue-700 dark:text-white"
            value={name}
            onChange={(event) => setName(event.target.value)}
            />
          <button 
            onClick={getColorDataByName}
            className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Search
          </button></div>
        </div>
      </div>
</div>
    )
}

export default SearchColor