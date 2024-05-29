"use client"
import { useState } from "react";

import { useTonConnectUI } from "@tonconnect/ui-react";

import { Burger } from "@/assets/svgs/Burger"
import { Logo } from "@/assets/svgs/Logo"
import { CrossMenu } from "@/assets/svgs/CrossMenu";

import styles from './authorizedUserMenu.module.scss'
import DropdownMenu from "../DropdownMenu/DropdownMenu";


const AuthorizedUserMenu: React.FC = () => {
  const [tonConnectUi] = useTonConnectUI();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  }
  
    return (
        <div className={styles.userAuthorizedWrapper} onClick={toggleMenu}>
        <Logo />
        {
          !menuIsOpen ? (
            <div className={styles.burgerMenu}>
              <Burger />
            </div>           
          ) : (
            <div className={styles.crossMenu}>
              <CrossMenu />
            </div>        
          )
        }
        <DropdownMenu menuIsOpen={menuIsOpen}/>        
      </div>
    )
}

export default AuthorizedUserMenu