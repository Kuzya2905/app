import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import styles from "./dropDown.module.scss";

const DropdownMenu = ({ buttonLogo, options, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownToggle} onClick={handleToggle}>
        {buttonLogo}
      </div>
      {isOpen && (
        <div style={{ width: "100px" }} className={styles.dropdownMenu}>
          {options.map((item) => (
            <button
              key={item.name}
              className={styles.dropdownItem}
              onClick={() => handleOptionSelect(item)}
            >
              {item.beforeIcon && (
                <Image
                  src={item.beforeIcon}
                  alt=""
                  className={styles.iconBefore}
                />
              )}
              {item.name}
              {item.afterIcon && (
                <Image
                  src={item.afterIcon}
                  alt=""
                  className={styles.iconAfter}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
