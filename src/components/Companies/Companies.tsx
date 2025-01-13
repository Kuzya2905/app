"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import CompanyCard from "@/components/CompanyCard/CompanyCard";
import FiltersCompanies from "@/components/FiltersCompanies/FiltersCompanies";
import { findAllCompaniesThunk } from "@/lib/features/companies/findAllCompanies/findAllCompaniesThunk";
import { AppDispatch } from "@/lib/store";

import { CompaniesReducersTypes } from "@/lib/features/companies/types";

import { Vector } from "@/assets/svgs/Vector";

import styles from "./companies.module.scss";

const Companies = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { allCompanies: cardsCompanies, loading } = useSelector(
    (state: CompaniesReducersTypes) => state.companiesReducers.findAllCompanies
  );

  useEffect(() => {
    
  }, [dispatch]);

  const handleClickCompany = (id: string) => router.push(`/company/${id}`);

  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <h1 className={styles.mainTitle}>Companies</h1>
        <section className={styles.mainSection}>
          <div className={styles.sectionBlock}>
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
                cardsCompanies.map(
                  ({ id, logo, title, description, city, vacancy }) => (
                    <CompanyCard
                      onClick={() => handleClickCompany(id)}
                      key={id}
                      logo={logo}
                      title={title}
                      description={description}
                      city={city}
                      vacancyNumber={vacancy.length}
                    />
                  )
                )
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
          <FiltersCompanies />
        </section>
      </div>
    </main>
  );
};

export default Companies;
