"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import { cardsCompanies } from "./RegisteredСompaniesData";
import CompanyCard from "@/components/CompanyCard/CompanyCard";

import { CompanyCardType } from "./RegisteredCompanies.types";

import styles from "./registeredСompanies.module.scss";

const RegisteredCompanies: React.FC = () => {
  const [cards, setCards] = useState<CompanyCardType[]>([]);

  const router = useRouter();
  const handleClickCompaniesButton = () => router.push("/companies");

  const handleClickCompany = (id: number) => router.push(`/company/${id}`);

  useEffect(() => {
    const addCardsCompanies = () => {
      const cards = localStorage.getItem("CardsCompanies");
      if (cards) {
        setCards(JSON.parse(cards).slice(-6));
      } else {
        localStorage.setItem("CardsCompanies", JSON.stringify(cardsCompanies));
        setCards(cardsCompanies.slice(-6));
      }
    };
    addCardsCompanies();
  }, []);

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
