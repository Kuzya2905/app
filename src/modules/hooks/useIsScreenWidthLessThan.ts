import { useState, useEffect } from "react";

const useIsScreenWidthLessThan = (width: number): boolean => {
  const [isScreenWidthLessThan, setIsScreenWidthLessThan] =
    useState<boolean>(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsScreenWidthLessThan(window.innerWidth < width);
    };

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, [width]);

  return isScreenWidthLessThan;
};

export default useIsScreenWidthLessThan;
