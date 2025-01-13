"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTonAddress } from "@tonconnect/ui-react";
import { useDispatch, useSelector } from "react-redux";

import { convertISOToDate, transformValueExperience } from "@/helpers/helpers";
import VacancyInfo from "@/components/VacancyInfo/VacancyInfo";
import VacancyApply from "@/components/VacancyApply/VacancyApply";
import { AppDispatch } from "@/lib/store";
import findOneJobThunk from "@/lib/features/jobs/findOneJob/findOneJobThunk";

import { VacancyTypes } from "./Vacancy.types";
import { CompaniesReducersTypes } from "@/lib/features/companies/types";
import { Job } from "@/lib/features/jobs/findOneJob/findOneJob.types";
import { JobsReducersTypes } from "@/lib/features/jobs/types";

import styles from "./vacancy.module.scss";

const Vacancy: React.FC<VacancyTypes> = ({ vacancyId }) => {
  const [firstLoading, setFirstLoading] = useState(true);

  const userAddress = useTonAddress();
  const dispatch = useDispatch<AppDispatch>();

  const foundVacancy = useSelector(
    (state: JobsReducersTypes) => state.jobsReducers.findOneJob.foundJob
  );

  const foundCompany = useSelector(
    (state: CompaniesReducersTypes) =>
      state.companiesReducers.findOneCompany.foundCompany
  );

 

  const isOwner =
    foundCompany?.walletAddress === userAddress && userAddress !== "";

  return (
    <>
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
                href={`/company/${foundCompany.id}`}
              >
                {foundCompany?.title}
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
                  {convertISOToDate(foundVacancy.createdAt)}
                </li>
                <li className={styles.totalInfoItem}>
                  From $ {foundVacancy.salary}
                </li>
                <li className={styles.totalInfoItem}>
                  {transformValueExperience(Number(foundVacancy.experience))}
                </li>
                <li className={styles.totalInfoItem}>{foundVacancy.mode}</li>
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
                    dataCompany={foundCompany}
                    idCompany={foundCompany.id}
                  />
                )}
              </aside>
            </div>
          </div>
        </div>
    </>
  );
};

export default Vacancy;
