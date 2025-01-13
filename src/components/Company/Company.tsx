"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTonAddress } from "@tonconnect/ui-react";
import { useDispatch, useSelector } from "react-redux";

import VacancyCard from "@/components/VacancyCard/VacancyCard";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import Button from "@/components/Button/Button";
import findJobsByCompanyThunk from "@/lib/features/jobs/findJobsByCompany/findJobsByCompanyThunk";
import { AppDispatch } from "@/lib/store";
import VacancyCardUser from "@/components/VacancyCardUser/VacancyCardUser";
import TabSwitcher from "@/components/TabSwitcher/TabSwitcher";
import { buttonsTabSwitcher } from "./CompanyData";
import ToastNotification from "@/components/ToastNotification/ToastNotification";

import { CompanyTypes } from "./Company.types";
import { CompaniesReducersTypes } from "@/lib/features/companies/types";
import { JobsReducersTypes } from "@/lib/features/jobs/types";
import { Job } from "@/lib/features/jobs/findJobsByCompany/findJobsByCompany.types";
import { FoundCompany } from "@/lib/features/companies/findOneCompany/findOneCompany.types";

import { Vector } from "@/assets/svgs/Vector";

import styles from "./company.module.scss";

const Company: React.FC<CompanyTypes> = ({ companyId }) => {
  const [firstLoading, setFirstLoading] = useState(true);
  const [valueActiveTab, setValueActiveTab] = useState("Active");
  const [notificationMessage, setNotificationMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const userAddress = useTonAddress();
  const router = useRouter();

  const foundCompany = useSelector(
    (state: CompaniesReducersTypes) =>
      state.companiesReducers.findOneCompany.foundCompany
  );
  const idVacanciesCompany = foundCompany?.vacancy;
  const isOwner = userAddress && foundCompany?.walletAddress === userAddress;

  const { foundJobs } = useSelector(
    (state: JobsReducersTypes) => state.jobsReducers.findJobsByCompany
  );

  useEffect(() => {
    const getCompany = async () => {
      setFirstLoading(false);
    };
    if (companyId) {
      getCompany();
    }
  }, [companyId, dispatch]);

  useEffect(() => {
    if (!idVacanciesCompany) return;
    

  }, [firstLoading, idVacanciesCompany, companyId, dispatch]);

  const handleClickVacancy = (id: string) => router.push(`/vacancy/${id}`);

  const handleTabChange = (tab: string) => {
    setValueActiveTab(tab);
  };

  const activateNotification = (messageNotification: string) => {
    setNotificationMessage(messageNotification);
  };

  const renderJobCard = (
    {
      id,
      name,
      experience,
      mode,
      city,
      description,
      salary,
      createdAt,
      published,
      idCompany,
    }: Job,
    userAddress: string,
    valueActiveTab: string,
    handleClickVacancy: (id: string) => void,
    foundCompany: FoundCompany
  ) => {
    const commonProps = {
      id,
      name,
      experience,
      typeOfEmployment: mode,
      city,
      salary,
      valueActiveTab,
      idCompany,
    };

    const isActiveTab =
      (published && valueActiveTab === "Active") ||
      (!published && valueActiveTab === "Archived");

    if (isOwner) {
      if (isActiveTab) {
        return (
          <VacancyCardUser
            {...commonProps}
            key={id}
            activateNotification={activateNotification}
          />
        );
      }
    } else {
      return (
        <VacancyCard
          key={id}
          onClick={() => handleClickVacancy(id)}
          description={description}
          nameCompany={foundCompany.title}
          logo={foundCompany.logo}
          date={createdAt}
          {...commonProps}
        />
      );
    }
    return null;
  };

  const handleCloseNotification = () => {
    setNotificationMessage("");
  };

  const getNotificationStatus = (message: string) =>
    /published|archives|deleted/.test(message) ? "positive" : "negative";

  return (
    <>
      {firstLoading ? (
        <div className={styles.canvas}>
          <div className={styles.canvasWrapper}>
            <div className={styles.loading}>Loading...</div>
          </div>
        </div>
      ) : foundCompany ? (
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
              <Link className={styles.blockLinkCurrent} href="">
                {foundCompany.title}
              </Link>
            </div>
            <div className={styles.wrapperBlockMain}>
              <main className={styles.main}>
                <div className={styles.mainTitleWrapper}>
                  <h1 className={styles.mainTitle}>Active jobs</h1>
                  {isOwner && (
                    <Button
                      appearance="primary"
                      size="m"
                      onClick={() =>
                        router.push(`/company/${companyId}/createVacancy`)
                      }
                    >
                      Publish
                    </Button>
                  )}
                </div>

                <div className={styles.mainBlock}>
                  <div className={styles.blockTotalSort}>
                    {userAddress &&
                      userAddress === foundCompany.walletAddress && (
                        <TabSwitcher
                          buttons={buttonsTabSwitcher}
                          valueActiveTab={valueActiveTab}
                          onTabChange={handleTabChange}
                        />
                      )}
                    <span className={styles.blockSort}>
                      By date of posting
                      <button className={styles.blockSortVector}>
                        <Vector />
                      </button>
                    </span>
                  </div>
                  <div className={styles.blockCards}>
                    {foundJobs ? (
                      foundJobs.map((job) =>
                        renderJobCard(
                          job,
                          userAddress,
                          valueActiveTab,
                          handleClickVacancy,
                          foundCompany
                        )
                      )
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </main>
              <aside>{<CompanyInfo dataCompany={foundCompany} />}</aside>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.canvas}>
          <div className={styles.canvasWrapper}>
            <div className={styles.noDataCompany}>
              No company data available
            </div>
          </div>
        </div>
      )}
      {notificationMessage && (
        <ToastNotification
          message={notificationMessage}
          status={getNotificationStatus(notificationMessage)}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
};

export default Company;
