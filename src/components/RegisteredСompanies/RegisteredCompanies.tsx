"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import { cardsCompanies } from "./RegisteredСompaniesData";
import CompanyCard from "@/components/CompanyCard/CompanyCard";

import styles from "./registeredСompanies.module.scss";

const RegisteredCompanies: React.FC = () => {
  const router = useRouter();
  const handleClickCompaniesButton = () => router.push("/companies");

  const cards = cardsCompanies.slice(0, 6);

  const handleClickCompany = (id: number) => router.push(`/company/${id}`);

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
          {cards.map(
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
