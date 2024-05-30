"use client"
import { useRef, useState } from "react";

import { Burger } from "@/assets/svgs/Burger"
import { Logo } from "@/assets/svgs/Logo"
import { CrossMenu } from "@/assets/svgs/CrossMenu";

import styles from './UserMenu.module.scss'
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useClickOutside } from "@/modules/hooks/useClickOutside";


const UserMenu: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const dropDownMenuRef = useRef(null);
  useClickOutside(dropDownMenuRef, () => {
    setMenuIsOpen(false);
  })

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  }
  
    return (
        <div className={styles.userAuthorizedWrapper} >
        <Logo />
        {          
          <div className={!menuIsOpen ? styles.burgerMenu : styles.crossMenu} onClick={toggleMenu}>
            {!menuIsOpen ? <Burger /> : <CrossMenu />}
          </div>         
        }
        <DropdownMenu ref={dropDownMenuRef} menuIsOpen={menuIsOpen}/>        
      </div>
    )
}

export default UserMenu