import { useEffect, useState } from "react";
import "./Navbar.css";
import { Sun, Moon } from "lucide-react";


function Navbar() {
  //  const [darkMode, setDarkMode] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored) {
      const parsed = JSON.parse(stored);
      const now = new Date().getTime();
      if (parsed.expiry > now) return parsed.value;
      localStorage.removeItem("darkMode"); // expired
    }
    return false; // default if nothing stored
  });


useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // save with 15-day expiry
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 15);
  localStorage.setItem(
    "darkMode",
    JSON.stringify({ value: darkMode, expiry: expireDate.getTime() })
  );
}, [darkMode]);

  return (
    <div className="mx-4">
    <nav className="w-full backdrop-blur-lg bg-white/30 rounded-full dark:bg-gray-200/50 shadow-md py-2 sm:py-4 px-3 sm:px-6 flex justify-between items-center">
      {/* Logo / Title */}
      <h1 className=" text-xl sm:text-2xl font-mono font-bold text-gray-800 dark:text-white">
        Color Lab
      </h1>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-800" />
        )}
      </button>
    </nav></div>
  )
}

export default Navbar