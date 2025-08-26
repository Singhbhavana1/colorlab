import { useState } from 'react'


import './App.css'
import LeftSide from './component/LeftSide';
import RightSide from './component/RightSide';
import RandomColor from './component/RandomColor';
import Navbar from './component/Navbar';
import ColorCombination from './component/ColorCombination';
import ColorContrast from './component/ColorContrast';
import CommonData from './component/CommonData';


function App() {
  // const [color, setColor]=useState()

  return (
    <div className="min-h-screen w-full flex justify-center items-center
    bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc]
  dark:from-[#050505] dark:to-[#1a1a1a]">
    <div className="flex justify-center">
      <div className="">
        <Navbar className="h-10" />
      <div className="block md:flex lg:block xl:flex">
          <div className="mx-5 my-5 px-5 py-2 rounded-2xl backdrop-blur-lg bg-white/30 border dark:border-slate-800  dark:bg-[#111827] shadow-md dark:shadow-inner dark:shadow-blue-100 ">
            <div className="sm:flex justify-between ">
              <LeftSide className="" />
              <RightSide className="" />
            </div>
          </div>
          <div className="">
        <div className="mx-5 my-5 px-5 py-2 rounded-2xl backdrop-blur-lg bg-white/30 border dark:border-slate-800  dark:bg-[#111827] shadow-md dark:shadow-inner dark:shadow-blue-100 "><CommonData /></div>
          <div className="mx-5 my-5 px-5 py-2 rounded-2xl backdrop-blur-lg bg-white/30 border dark:border-slate-800  dark:bg-[#111827] shadow-md dark:shadow-inner dark:shadow-blue-100 ">
          <ColorCombination />
        </div>
          <div className="mx-5 my-5 px-5 py-2 rounded-2xl backdrop-blur-lg bg-white/30 border dark:border-slate-800  dark:bg-[#111827] shadow-md dark:shadow-inner dark:shadow-blue-100 ">
          <ColorContrast />
        </div>
        </div>
      </div></div>
    </div></div>
  )

}

export default App
