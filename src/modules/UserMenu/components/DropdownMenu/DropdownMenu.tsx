"use client"
import { useEffect, useState } from 'react';

import { DropdownMenuTypes } from './dropdownMenu.types';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import Link from "@/components/Link/Link";
import { getAddressBalance } from '@/utils/api'
import LinkNext from "next/link";
import Image from "next/image";
import cn from "classnames";

import LogoEmpty from "@/assets/svgs/logoEmpty.svg";
import Publish from "@/assets/svgs/Publish.svg"
import LogOut from "@/assets/svgs/LogOut.svg"
import TonIcon from '@/assets/svgs//TonIcon.svg'

import styles from './dropdownMenu.module.scss';
import Button from '@/components/Button/Button';



const DropdownMenu:React.FC<DropdownMenuTypes> = ({menuIsOpen}) => {
    const userAddress = useTonAddress();
    const [tonConnectUi] = useTonConnectUI();
    const [balancy, setBalancy] = useState<number | null>(0);

    useEffect(() => {
        getBalancy();
    }, [])
 
    const getBalancy = async () => {
        const data = await getAddressBalance(userAddress);
       setBalancy(data && data.ok === 'ok' ? Number(data.result) / 1000000000 : null)
    }

    return (
        <div 
            className={cn(styles.dropdownMenu, {
            [styles.active] : menuIsOpen})}
            onClick={(e)=> {
                e.stopPropagation();
            }}
        >
            <div className={styles.header}>
                <div className={styles.imgWrapper}>
                    <Image
                        className={styles.logoEmpty}
                        src={LogoEmpty}
                        priority
                        alt="LogoEmpty" 
                        width={64}
                        height={64}
                    />
                </div>
                <div className={styles.userAddressWapper}> 
                    <h3 className={styles.userAddress}>{`${userAddress.slice(0, 4)}...${userAddress.slice(userAddress.length -4)}`}</h3>
                    <LinkNext className={styles.headerLink} href={'/'}>
                        Перейти в профиль
                    </LinkNext>
                </div>
            </div>
            <div className={styles.balancyWrapper }>
                <h3 className={styles.balancyTitle}>Ваш баланс</h3>
                <div className={styles.balancy}>
                    <Image
                        className={styles.balancyIcon}
                        src={TonIcon}
                        priority
                        alt="TonIcon" 
                        width={16}
                        height={16}
                    />
                    <p className={styles.balancyTon}>{balancy}</p>
                </div>
            </div>
            <div className={styles.menuList}>
                <Link
                    className={styles.menuListItem}
                    key={null}
                    count={0}
                    withCount={false}
                    disabled={false}
                    link={'/vacancy/create'}
                    logoUrl={Publish}
                    size='s'
                >
                    Publish
                </Link>
                
                <Button
                    appearance="menu"
                    size="xs"
                    type="button"
                    startIcon={LogOut}
                    iconSize={24}
                    onClick={() => tonConnectUi.disconnect()}
                >
                    Log out
                </Button>
                               
            </div>
        </div>
    )
}

export default DropdownMenu