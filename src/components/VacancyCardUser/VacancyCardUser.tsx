import React, { useEffect, useState } from "react";
import cn from "classnames";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { priceRu, transformValueExperience } from "@/helpers/helpers";
import More from "@/assets/svgs/More.svg";
import { VacancyCardUserTypes } from "./VacancyCardUser.types";
import styles from "./vacancyCardUser.module.scss";
import DropdownMenu from "../DropDown/DropDown";
import {
  optionsDropDownActive,
  optionsDropDownArchived,
} from "./VacancyCardUserData";
import updateJobThunk from "@/lib/features/jobs/updateJob/updateJobThunk";
import findJobsByCompanyThunk from "@/lib/features/jobs/findJobsByCompany/findJobsByCompanyThunk";
import deleteJobThunk from "@/lib/features/jobs/deleteJob/deleteJobThunk";
import { JobsReducersTypes } from "@/lib/features/jobs/types";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { AppDispatch } from "@/lib/store";

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
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionsDropDown, setOptionsDropDown] = useState(optionsDropDownActive);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { foundJobs } = useSelector(
    (state: JobsReducersTypes) => state.jobsReducers.findJobsByCompany
  );

  const changePublicationStatus = async (status) => {
    const dataVacancy = foundJobs?.find((item) => item.id === id);
    const newDataVacancy = { ...dataVacancy, published: status };

    await dispatch(updateJobThunk({ idJob: id, jobData: newDataVacancy }));

    await dispatch(findJobsByCompanyThunk(dataVacancy.idCompany));
  };

  const deleteVacancy = async () => {
    await dispatch(deleteJobThunk(id));
    await dispatch(findJobsByCompanyThunk(idCompany));
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    option.name === "Publish" || option.name === "Edit"
      ? setOpenModal(false)
      : setOpenModal(true);
  };

  const handleModalConfirm = () => {
    selectedOption?.name === "Withdraw" && changePublicationStatus(false);
    selectedOption?.name === "Delete" && deleteVacancy();
    setOpenModal(false);
  };

  useEffect(() => {
    selectedOption?.name === "Edit" && router.push(`/vacancy/${id}/edit`);
    selectedOption?.name === "Publish" && changePublicationStatus(true);
  }, [selectedOption]);

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
        <DropdownMenu
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
