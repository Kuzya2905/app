"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTonAddress } from "@tonconnect/ui-react";

import { convertISOToDate, yearDeclensionEn } from "@/helpers/helpers";
import VacancyInfo from "@/components/VacancyInfo/VacancyInfo";
import VacancyApply from "@/components/VacancyApply/VacancyApply";

import { CompanyTypes } from "./Vacancy.types";

import styles from "./vacancy.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import findOneJobThunk from "@/lib/features/jobs/findOneJob/findOneJobThunk";

const Vacancy: React.FC<CompanyTypes> = ({ vacancyId }) => {
  const userAddress = useTonAddress();
  const [firstLoading, setFirstLoading] = useState(true);

  const foundVacancy = useSelector(
    (state) => state.jobsReducers.findOneJob.foundJob
  );

  console.log(foundVacancy);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getVacancy = async () => {
      await dispatch(findOneJobThunk(vacancyId));
      setFirstLoading(false);
    };
    getVacancy();
  }, [vacancyId, dispatch]);

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
      {foundVacancy ? (
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
                {foundVacancy?.name}
              </Link>
            </div>
            <div className={styles.blockTop}>
              <h1 className={styles.blockTopTitle}>{foundVacancy.name}</h1>
              <ul className={styles.blockTotalInfo}>
                <li className={styles.totalInfoItem}>
                  {convertISOToDate(foundVacancy.date)}
                </li>
                <li className={styles.totalInfoItem}>
                  From $ {foundVacancy.salary}
                </li>
                <li className={styles.totalInfoItem}>
                  {checkExperience(foundVacancy.experience)}
                </li>
                <li className={styles.totalInfoItem}>
                  {foundVacancy.typeOfEmployment}
                </li>
                <li className={styles.totalInfoItem}>{foundVacancy.city}</li>
              </ul>
            </div>
            <div className={styles.wrapperBlockMain}>
              <div className={styles.blockInformation}>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Description</h2>
                  <div className={styles.sectionText}>
                    {foundVacancy.description}
                  </div>
                </div>
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Requirements</h3>
                  <div className={styles.sectionText}>
                    {foundVacancy.requirements}
                  </div>
                </div>
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Responsibilities</h3>
                  <div className={styles.sectionText}>
                    {foundVacancy.responsibilities}
                  </div>
                </div>
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>TermsAndConditions</h3>
                  <div className={styles.sectionText}>
                    {foundVacancy.termsAndConditions}
                  </div>
                </div>
              </div>
              <aside className={styles.aside}>
                {isOwner ? (
                  <VacancyInfo
                    dataVacancy={foundVacancy}
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
