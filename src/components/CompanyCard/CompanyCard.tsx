import React from "react";
import Image from "next/image";

import { Location } from "@/components/CompanyCard/Location";
import { Fire } from "@/components/CompanyCard/Fire";

import { CompanyCardTypes } from "@/components/CompanyCard/CompanyCard.types";

import styles from "./CompanyCard.module.scss";

const CompanyCard: React.FC<CompanyCardTypes> = ({
  logo,
  title,
  description,
  city,
  vacancyNumber,
  ...props
}) => (
  <div className={styles.content} {...props}>
    <Image
      className={styles.logo}
      src={logo}
      alt="Company image"
      width={48}
      height={48}
    />
    <div className={styles.descriptionBlock}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
    <div className={styles.locationBlock}>
      <div className={styles.flex}>
        <Location />
        <p className={styles.locationText}>{city}</p>
      </div>
      <div className={styles.flex}>
        <Fire />
        <p className={styles.locationVacancy}>{vacancyNumber} vacancies</p>
      </div>
    </div>
  </div>
);

export default CompanyCard;
