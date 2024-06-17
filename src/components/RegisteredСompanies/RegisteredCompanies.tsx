"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/Button/Button";
import CompanyCard from "@/components/CompanyCard/CompanyCard";
import { AppDispatch } from "@/lib/store";
import { findAllCompaniesThunk } from "@/lib/features/companies/findAllCompanies/findAllCompaniesThunk";

import { RootState } from "@/lib/features/companies/types";

import styles from "./registeredСompanies.module.scss";

const RegisteredCompanies: React.FC = () => {
  const router = useRouter();
  const handleClickCompaniesButton = () => router.push("/companies");

  const handleClickCompany = (id: string) => router.push(`/company/${id}`);

  const dispatch = useDispatch<AppDispatch>();

  let cardsCompanies = useSelector(
    (state: RootState) => state.companiesReducers.findAllCompanies.allCompanies
  );

  cardsCompanies = cardsCompanies.slice(-6);

  useEffect(() => {
    dispatch(findAllCompaniesThunk());
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionTitle}>
          <h1 className={styles.sectionTitleText}>Company registered</h1>
          <Button
            appearance="primary"
            size="l"
            className={styles.sectionTitleButton}
            onClick={handleClickCompaniesButton}
          >
            All companies
          </Button>
        </div>
        <div className={styles.sectionCards}>
          {cardsCompanies.map(
            ({ id, logo, title, description, city, vacancyNumber }) => (
              <CompanyCard
                onClick={() => handleClickCompany(id)}
                key={id}
                logo={logo}
                title={title}
                description={description}
                city={city}
                vacancyNumber={vacancyNumber}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default RegisteredCompanies;
