"use client";

import React from "react";
import { useRouter } from "next/navigation";

import CompanyCard from "@/components/CompanyCard/CompanyCard";
import FiltersCompanies from "@/components/FiltersCompanies/FiltersCompanies";
import { cardsCompanies } from "@/components/RegisteredСompanies/RegisteredСompaniesData";

import { Vector } from "@/assets/svgs/Vector";

import styles from "./companies.module.scss";

const Companies = () => {
  const router = useRouter();
  const handleClickCompany = (id: number) => router.push(`/company/${id}`);

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
          <FiltersCompanies />
        </section>
      </div>
    </main>
  );
};

export default Companies;
