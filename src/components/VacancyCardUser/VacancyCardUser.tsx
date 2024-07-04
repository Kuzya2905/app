import React, { useEffect, useState } from "react";
import cn from "classnames";
import Image from "next/image";

import { priceRu, transformValueExperience } from "@/helpers/helpers";
import More from "@/assets/svgs/More.svg";

import { VacancyCardUserTypes } from "./VacancyCardUser.types";

import styles from "./vacancyCardUser.module.scss";
import DropdownMenu from "../DropDown/DropDown";
import { optionsDropDown } from "./VacancyCardUserData";
import findOneJobThunk from "@/lib/features/jobs/findOneJob/findOneJobThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";

const VacancyCardUser: React.FC<VacancyCardUserTypes> = ({
  name,
  experience,
  typeOfEmployment,
  city,
  salary,
  className,
  id,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch<AppDispatch>();

  const changeStatusVacancy = async () => {
    const { payload: dataVacancy } = await dispatch(findOneJobThunk(id));
    

    console.log(dataVacancy);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (selectedOption?.name === "Publish") {
      changeStatusVacancy();
    }
  });

  return (
    <div className={cn(className, styles.cardContainer)} {...props}>
      <div className={styles.cardHeader}>
        <h3 className={styles.vacancyTitle}>{name}</h3>
        <DropdownMenu
          buttonLogo={<Image src={More} alt="More" width={24} height={24} />}
          options={optionsDropDown}
          onOptionSelect={handleOptionSelect}
        />
      </div>
      <div className={styles.vacancyInfo}>
        <p className={styles.vacancyInfoText}>
          {transformValueExperience(experience)}
        </p>
        <div className={styles.circle} />
        <p className={styles.vacancyInfoText}>{typeOfEmployment}</p>
        <div className={styles.circle} />
        <p className={styles.vacancyInfoText}>{city}</p>
      </div>
      <div className={styles.vacancyCardFooter}>
        <p className={styles.vacancySalary}>{priceRu(salary)}</p>
      </div>
    </div>
  );
};

export default React.memo(VacancyCardUser);
