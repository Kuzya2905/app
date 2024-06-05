"use client";

import React from "react";
import Link from "next/link";
import { useTonAddress } from "@tonconnect/ui-react";

import { convertISOToDate, yearDeclensionEn } from "@/helpers/helpers";
import VacancyInfo from "@/components/VacancyInfo/VacancyInfo";
import VacancyApply from "@/components/VacancyApply/VacancyApply";

import { CompanyTypes } from "./Vacancy.types";

import styles from "./vacancy.module.scss";

const Vacancy: React.FC<CompanyTypes> = ({ vacancyId }) => {
  const userAddress = useTonAddress();

  const vacanciesJSON = localStorage.getItem("CardsVacancies");
  const vacancies = vacanciesJSON && JSON.parse(vacanciesJSON);

  const dataVacancy = vacancies.find(
    (vacancy: { idVacancy: number }) => vacancy.idVacancy === Number(vacancyId)
  );

  const idCompany = String(dataVacancy?.idCompany);

  const companiesJSON = localStorage.getItem("CardsCompanies");
  const dataCompany =
    companiesJSON &&
    JSON.parse(companiesJSON).find(
      (company: { id: number }) => company.id === Number(idCompany)
    );
  const isOwner =
    dataCompany && userAddress && userAddress === dataCompany.walletAddress;

  const checkExperience = (experience: string) => {
    return experience === "No experience"
      ? experience
      : `Experience from ${experience}`;
  };

  return (
    <>
      {dataVacancy ? (
        <div className={styles.canvas}>
          <div className={styles.canvasWrapper}>
            <div className={styles.wrapperBlockLinks}>
              <Link className={styles.blockLink} href="/">
                Main
              </Link>
              <span className={styles.blockSlash}>/</span>
              <Link className={styles.blockLink} href="/companies">
                Companies
              </Link>
              <span className={styles.blockSlash}>/</span>
              <Link
                className={styles.blockLinkCurrent}
                href={`/company/${idCompany}`}
              >
                {dataCompany?.title}
              </Link>
              <span className={styles.blockSlash}>/</span>
              <Link className={styles.blockLinkCurrent} href={""}>
                {dataVacancy?.name}
              </Link>
            </div>
            <div className={styles.blockTop}>
              <h1 className={styles.blockTopTitle}>{dataVacancy.name}</h1>
              <ul className={styles.blockTotalInfo}>
                <li className={styles.totalInfoItem}>
                  {convertISOToDate(dataVacancy.date)}
                </li>
                <li className={styles.totalInfoItem}>
                  From $ {dataVacancy.salary}
                </li>
                <li className={styles.totalInfoItem}>
                  {checkExperience(dataVacancy.experience)}
                </li>
                <li className={styles.totalInfoItem}>
                  {dataVacancy.typeOfEmployment}
                </li>
                <li className={styles.totalInfoItem}>{dataVacancy.city}</li>
              </ul>
            </div>
            <div className={styles.wrapperBlockMain}>
              <div className={styles.blockInformation}>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Description</h2>
                  <div className={styles.sectionText}>
                    {dataVacancy.description}
                  </div>
                </div>
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Requirements</h3>
                  <div className={styles.sectionText}>
                    {dataVacancy.requirements}
                  </div>
                </div>
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Responsibilities</h3>
                  <div className={styles.sectionText}>
                    {dataVacancy.responsibilities}
                  </div>
                </div>
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>TermsAndConditions</h3>
                  <div className={styles.sectionText}>
                    {dataVacancy.termsAndConditions}
                  </div>
                </div>
              </div>
              <aside className={styles.aside}>
                {isOwner ? (
                  <VacancyInfo
                    dataVacancy={dataVacancy}
                    vacancyId={vacancyId}
                  />
                ) : (
                  <VacancyApply
                    dataCompany={dataCompany}
                    idCompany={idCompany}
                  />
                )}
              </aside>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.canvas}>
          <div className={styles.canvasWrapper}>No Vacancy data available</div>
        </div>
      )}
    </>
  );
};

export default Vacancy;
