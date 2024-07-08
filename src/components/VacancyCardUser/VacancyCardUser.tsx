import React, { useEffect, useState } from "react";
import cn from "classnames";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { priceRu, transformValueExperience } from "@/helpers/helpers";
import DropDown from "@/components/DropDown/DropDown";
import {
  optionsDropDownActive,
  optionsDropDownArchived,
} from "./VacancyCardUserData";
import updateJobThunk from "@/lib/features/jobs/updateJob/updateJobThunk";
import findJobsByCompanyThunk from "@/lib/features/jobs/findJobsByCompany/findJobsByCompanyThunk";
import deleteJobThunk from "@/lib/features/jobs/deleteJob/deleteJobThunk";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import { AppDispatch } from "@/lib/store";

import { JobsReducersTypes } from "@/lib/features/jobs/types";
import {
  OptionDropDownType,
  VacancyCardUserTypes,
} from "./VacancyCardUser.types";

import More from "@/assets/svgs/More.svg";

import styles from "./vacancyCardUser.module.scss";

const VacancyCardUser: React.FC<VacancyCardUserTypes> = ({
  name,
  experience,
  typeOfEmployment,
  city,
  salary,
  className,
  id,
  idCompany,
  valueActiveTab,
  activateNotification,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionDropDownType>();
  const [optionsDropDown, setOptionsDropDown] = useState(optionsDropDownActive);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { foundJobs } = useSelector(
    (state: JobsReducersTypes) => state.jobsReducers.findJobsByCompany
  );

  const withdrawPublication = async () => {
    const dataVacancy = foundJobs?.find((item) => item.id === id);

    if (!dataVacancy) {
      activateNotification("Job not found");
      return;
    }

    const newDataVacancy = { ...dataVacancy, published: false };

    try {
      await dispatch(
        updateJobThunk({ idJob: id as string, jobData: newDataVacancy })
      ).unwrap();

      await dispatch(findJobsByCompanyThunk(dataVacancy.idCompany)).unwrap();
      activateNotification("Moved to the archives");
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      activateNotification(errorMessage);
    }
  };

  const deleteVacancy = async () => {
    try {
      await dispatch(deleteJobThunk(id as string)).unwrap();
      await dispatch(findJobsByCompanyThunk(idCompany)).unwrap();
      activateNotification("Ad deleted");
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      activateNotification(errorMessage);
    }
  };

  const handleOptionSelect = (option: OptionDropDownType) => {
    setSelectedOption(option);
    option.name === "Publish" || option.name === "Edit"
      ? setOpenModal(false)
      : setOpenModal(true);
  };

  const handleModalConfirm = () => {
    selectedOption?.name === "Withdraw" && withdrawPublication();
    selectedOption?.name === "Delete" && deleteVacancy();
    setOpenModal(false);
  };

  useEffect(() => {
    const handleSelectedOption = () => {
      selectedOption?.name === "Edit" && router.push(`/vacancy/${id}/edit`);
      selectedOption?.name === "Publish" &&
        router.push(`/vacancy/${id}/re-posting`);
    };
    handleSelectedOption();
  }, [selectedOption, id, router]);

  useEffect(() => {
    setOptionsDropDown(
      valueActiveTab === "Active"
        ? optionsDropDownActive
        : optionsDropDownArchived
    );
  }, [valueActiveTab]);

  const getModalTitle = () =>
    selectedOption?.name === "Delete"
      ? "Delete"
      : selectedOption?.name === "Withdraw"
      ? "Move to archive"
      : "";

  return (
    <div className={cn(className, styles.cardContainer)} {...props}>
      <div className={styles.cardHeader}>
        <h3 className={styles.vacancyTitle}>{name}</h3>
        <DropDown
          buttonLogo={<Image src={More} alt="More" width={24} height={24} />}
          options={optionsDropDown}
          onOptionSelect={handleOptionSelect}
        />
      </div>
      <div className={styles.vacancyInfo}>
        <p className={styles.vacancyInfoText}>
          {transformValueExperience(experience)}
        </p>
        <div className={styles.circle} />
        <p className={styles.vacancyInfoText}>{typeOfEmployment}</p>
        <div className={styles.circle} />
        <p className={styles.vacancyInfoText}>{city}</p>
      </div>
      <div className={styles.vacancyCardFooter}>
        <p className={styles.vacancySalary}>{priceRu(salary)}</p>
      </div>
      {openModal && (
        <Modal title={getModalTitle()} onClose={() => setOpenModal(false)}>
          <div className={styles.modalBody}>
            {selectedOption?.name === "Delete"
              ? "Are you sure you want to delete this listing? Once deleted, the listing will be unpublished."
              : "Are you sure you want to move this listing to the archive? Moving it to the archive will unpublish the listing."}
          </div>
          <div className={styles.modalFooter}>
            <Button
              className={styles.noButton}
              appearance="secondary"
              size="l"
              onClick={() => setOpenModal(false)}
            >
              No
            </Button>
            <Button
              className={styles.yesButton}
              appearance="primary"
              size="l"
              onClick={handleModalConfirm}
            >
              Yes
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default React.memo(VacancyCardUser);
