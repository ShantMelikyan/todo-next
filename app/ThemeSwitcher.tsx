"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const light = theme === "light";
  return (
    <div>
      <br />
      <button className=" dark:text-yellow-400 text-white transition-all duration-300 " >
      {light ? (
        <FaMoon onClick={() => setTheme("dark")} size={27} />
      ) : (
        <FaSun onClick={() => setTheme("light")} size={27} />
      )}
    </button>
    </div>
  );
};

export default ThemeSwitcher;