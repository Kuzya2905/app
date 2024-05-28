"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/components/Input/Input";
import FiltersJobs from "@/components/FiltersJobs/FilterJobs";
import { cardsVacancies } from "@/components/RegisteredVacancies/RegisteredVacanciesDate";
import VacancyCard from "@/components/VacancyCard/VacancyCard";

import { Vector } from "@/assets/svgs/Vector";

import styles from "./jobs.module.scss";

const Jobs = () => {
  const { register } = useForm();

  const router = useRouter();

  const handleClickVacancy = (idVacancy: number) =>
    router.push(`/vacancy/${idVacancy}`);

  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <h1 className={styles.mainTitle}>Jobs</h1>
        <section className={styles.mainSection}>
          <div className={styles.sectionBlock}>
            <Input
              isIcon={true}
              className={styles.inputContainer}
              placeholder="Search..."
              name="search"
              register={register}
            />
            <div className={styles.blockTotalSort}>
              <span className={styles.blockTotal}>Total vacancies: 250</span>
              <span className={styles.blockSort}>
                By date of posting
                <button className={styles.blockSortVector}>
                  <Vector />
                </button>
              </span>
            </div>
            <div className={styles.blockCards}>
              {cardsVacancies.map(
                ({
                  idVacancy,
                  name,
                  experience,
                  mode,
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
                    mode={mode}
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
          <FiltersJobs />
        </section>
      </div>
    </main>
  );
};

export default Jobs;
