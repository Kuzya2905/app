"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VacancyCard from "@/components/VacancyCard/VacancyCard";
import { cardsVacancies } from "./RegisteredVacanciesDate";
import Button from "@/components/Button/Button";

import { VacancyCardType } from "./RegisteredVacancies.types";

import styles from "./registeredVacancies.module.scss";

const RegisteredVacancies: React.FC = () => {
  const [vacancies, setVacancies] = useState<VacancyCardType[]>([]);

  const router = useRouter();

  const handleClickJobsButton = () => router.push("/vacancies");

  const handleClickVacancy = (idVacancy: number) =>
    router.push(`/vacancy/${idVacancy}`);

  const addCardsVacancies = () => {
    const cards = localStorage.getItem("CardsVacancies");
    if (cards) {
      setVacancies(JSON.parse(cards).slice(-8));
    } else {
      localStorage.setItem("CardsVacancies", JSON.stringify(cardsVacancies));
      setVacancies(cardsVacancies);
    }
  };

  useEffect(() => {
    addCardsVacancies();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionTitle}>
          <h3 className={styles.sectionTitleText}>Find the right position</h3>
          <Button
            appearance="primary"
            size="l"
            className={styles.sectionTitleButton}
            onClick={() => handleClickJobsButton()}
          >
            All jobs
          </Button>
        </div>
        <div className={styles.sectionCards}>
          {vacancies.map(
            ({
              idVacancy,
              name,
              experience,
              typeOfEmployment,
              city,
              description,
              salary,
              company,
              logo,
              date,
            }) => (
              <VacancyCard
                onClick={() => handleClickVacancy(idVacancy)}
                key={idVacancy}
                name={name}
                experience={experience}
                typeOfEmployment={typeOfEmployment}
                city={city}
                description={description}
                salary={salary}
                company={company}
                logo={logo}
                date={date}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default RegisteredVacancies;
