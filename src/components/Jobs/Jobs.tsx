"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/components/Input/Input";
import FiltersJobs from "@/components/FiltersJobs/FilterJobs";
import VacancyCard from "@/components/VacancyCard/VacancyCard";

import { VacancyCardType } from "./Jobs.types";

import { Vector } from "@/assets/svgs/Vector";

import styles from "./jobs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { JobsReducersTypes } from "@/lib/features/jobs/types";
import { AppDispatch } from "@/lib/store";
import { findAllJobsThunk } from "@/lib/features/jobs/findAllJobs/findAllJobsThunk";

const Jobs = () => {
  const dispatch = useDispatch<AppDispatch>();

  let { allJobs: cardsVacancies, loading } = useSelector(
    (state: JobsReducersTypes) => state.jobsReducers.findAllJobs
  );

  useEffect(() => {
    dispatch(findAllJobsThunk());
  }, [dispatch]);

  const { register } = useForm();

  const router = useRouter();

  const handleClickVacancy = (idVacancy: string) =>
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
              {!loading ? (
                cardsVacancies.map(
                  ({
                    id,
                    name,
                    experience,
                    mode,
                    city,
                    description,
                    salary,
                    nameCompany,
                    logo,
                    createdAt,
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
                )
              ) : (
                <div>Loading...</div>
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
