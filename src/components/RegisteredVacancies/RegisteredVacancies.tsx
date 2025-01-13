"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import VacancyCard from "@/components/VacancyCard/VacancyCard";
import Button from "@/components/Button/Button";
import { AppDispatch } from "@/lib/store";
import { findAllJobsThunk } from "@/lib/features/jobs/findAllJobs/findAllJobsThunk";

import { JobsReducersTypes } from "@/lib/features/jobs/types";

import styles from "./registeredVacancies.module.scss";

const RegisteredVacancies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const handleClickJobsButton = () => router.push("/vacancies");

  const handleClickVacancy = (idVacancy: string) =>
    router.push(`/vacancy/${idVacancy}`);

  let { allJobs: cardsVacancies } = useSelector(
    (state: JobsReducersTypes) => state.jobsReducers.findAllJobs
  );
  cardsVacancies = cardsVacancies.slice(-8);


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
          {cardsVacancies.map(
            ({
              id,
              name,
              experience,
              mode,
              city,
              description,
              salary,
              logo,
              createdAt,
              nameCompany,
            }) => (
              <VacancyCard
                onClick={() => handleClickVacancy(id)}
                key={id}
                name={name}
                experience={experience}
                typeOfEmployment={mode}
                city={city}
                description={description}
                salary={salary}
                nameCompany={nameCompany}
                logo={logo}
                date={createdAt}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default RegisteredVacancies;
