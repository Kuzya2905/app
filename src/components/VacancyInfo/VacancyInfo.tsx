"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Button from "../Button/Button";
import { convertISOToDate} from "@/helpers/helpers";

import VacancyInfoTypes from "./VacancyInfo.types";

import styles from './VacancyInfo.module.scss';

const VacancyInfo:React.FC<VacancyInfoTypes>= ({dataVacancy}) => {

    const router = useRouter();

    return (
        <div className={styles.vacancyInfo}>
            <div className={styles.titleWrapper}>
                <h3 className={styles.title}>Placement period</h3> 
                <div className={styles.periodWrapper}>
                    <h4 className={styles.periodTitle}> The vacancy is active during:</h4>
                    <p className={styles.period}>{`${convertISOToDate(dataVacancy.date)} - ${convertISOToDate(dataVacancy.expirationDate)}`}</p>
                </div> 
            </div>
            <div className={styles.buttons}>
                <Button
                    appearance="secondary"
                    size="l"
                    onClick={() => console.log('Edit')}
                >
                    Edit
                </Button>
                <Button
                    appearance="primary"
                    size="l"
                    onClick={() => console.log('Withdraw publication')}
                >
                    Withdraw publication
                </Button> 
            </div>           
        </div>
    )
}

export default VacancyInfo

