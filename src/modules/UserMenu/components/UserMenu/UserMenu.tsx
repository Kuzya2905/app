"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useTonWallet } from "@tonconnect/ui-react";

import DropdownMenu from "@/modules/UserMenu/components/DropdownMenu/DropdownMenu";
import { useClickOutside } from "@/modules/hooks/useClickOutside";

import LogoEmpty from "@/assets/svgs/logoEmpty.svg";
import { Burger } from "@/assets/svgs/Burger";
import { CrossMenu } from "@/assets/svgs/CrossMenu";

import styles from "./UserMenu.module.scss";

const UserMenu: React.FC = ({ ...props }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const userMenuRef = useRef(null);
  const wallet = useTonWallet();

  useClickOutside(userMenuRef, () => {
    setMenuIsOpen(false);
  });

  const toggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  return (
    <div
      className={styles.userMenuWrapper}
      onClick={toggleMenu}
      ref={userMenuRef}
      {...props}
    >
      <div className={styles.imgWrapper}>
        <Image
          className={styles.logoEmpty}
          src={wallet && "imageUrl" in wallet ? wallet.imageUrl : LogoEmpty}
          priority
          alt="LogoEmpty"
          width={32}
          height={32}
        />
      </div>
      {
        <div className={!menuIsOpen ? styles.burgerMenu : styles.crossMenu}>
          {!menuIsOpen ? <Burger /> : <CrossMenu />}
        </div>
      }
      <DropdownMenu menuIsOpen={menuIsOpen} />
    </div>
  );
};

export default UserMenu;
