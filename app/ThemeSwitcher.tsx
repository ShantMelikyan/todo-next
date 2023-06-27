"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Moon from "/public/images/icon-moon.svg"
import Sun from "/public/images/icon-sun.svg"

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
      <button className=" dark:text-yellow-400 text-white transition-all duration-300 " >
      {light ? (
        <Image alt="moon icon" src={Moon} width={25} height={25} onClick={() => setTheme("dark")}/>
      ) : (
        <Image alt="moon icon" src={Sun} width={25} height={25} onClick={() => setTheme("light")}/>
      )}
    </button>
    </div>
  );
};

export default ThemeSwitcher;