import React from "react";
import cn from "classnames";

import styles from "./tabSwitcher.module.scss";

const TabSwitcher = ({ buttons, valueActiveTab, onTabChange }) => {
  const handleTabClick = (tab) => {
    onTabChange(tab);
  };

  return (
    <div className={styles.tabSwitcher}>
      {buttons.map((button) => (
        <button
          key={button.name}
          className={cn(styles.tab, {
            [styles.active]: valueActiveTab === button.name,
          })}
          onClick={() => handleTabClick(button.name)}
        >
          <div
            className={cn(styles.icon, {
              [styles.active]: valueActiveTab === button.name,
            })}
          >
            <button.icon />
          </div>

          <span>{button.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
