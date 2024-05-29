import { DropdownMenuTypes } from './dropdownMenu.types';
import cn from "classnames";

import styles from './dropdownMenu.module.scss';

const DropdownMenu:React.FC<DropdownMenuTypes> = ({menuIsOpen}) => {
    return (
        <div className={cn(styles.dropdownMenu, {
            [styles.active] : menuIsOpen})}>
                <p>test</p>
        </div>
    )
}

export default DropdownMenu