"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SubmitHandler,
  useForm,
  Controller,
  FieldError,
} from "react-hook-form";
import cn from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import Checkbox from "@/components/Checkbox/Checkbox";
import { vacancyFormSchemaRePost } from "@/modules/vacancies/constants/vacancyFormSchemaRePost/vacancyFormSchemaRePost";
import {
  EmploymentType,
  Experience,
  Other,
  Qualification,
  dataTags,
  dataTextareas,
} from "./VacancyFormRePostData";
import CheckboxTag from "@/components/CheckboxTag/CheckboxTag";
import Textarea from "@/components/Textarea/Textarea";
import PreviewVacancy from "@/modules/vacancies/components/PreviewVacancy/PreviewVacancy";
import { RePostVacancy } from "./rePostVacancy";
import { AppDispatch } from "@/lib/store";
import findOneJobThunk from "@/lib/features/jobs/findOneJob/findOneJobThunk";
import updateJobThunk from "@/lib/features/jobs/updateJob/updateJobThunk";
import Modal from "@/components/Modal/Modal";

import { VARIANT } from "@/components/Select/Select.types";
import { Job } from "@/lib/features/jobs/updateJob/updateJobs.types";
import { JobsReducersTypes } from "@/lib/features/jobs/types";

import styles from "./styles.module.scss";
import { VacancyFormRePostTypes } from "./VacancyFormRePost.types";

const VacancyFormRePost = () => {
  const [formDefaultData, setFormDefaultData] = useState<Job>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<VacancyFormRePostTypes>({
    resolver: yupResolver(vacancyFormSchemaRePost),
    mode: "all",
  });

  const [activePreview, setActivePreview] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [permissionGoVacancy, setPermissionGoVacancy] = useState(false);
  const [availablePublications, setAvailablePublications] = useState<number>(0);

  const [validBasicBlock, setValidBasicBlock] = useState(false);
  const [validDescriptionBlock, setValidDescriptionBlock] = useState(false);

  const pathname = usePathname();
  const idVacancy = pathname.split("/vacancy/")[1].split("/re-posting")[0];

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const fieldsBasic: (keyof VacancyFormRePostTypes)[] = useMemo(
    () => ["name", "other", "qualification", "experience", "mode", "salary"],
    []
  );
  const valuesFieldsBasic = watch(fieldsBasic);

  const fieldsJobDescription: (keyof VacancyFormRePostTypes)[] = useMemo(
    () => [
      "description",
      "requirements",
      "responsibilities",
      "termsAndConditions",
    ],
    []
  );
  const valuesJobDescription = watch(fieldsJobDescription);

  const { foundJob } = useSelector(
    (state: JobsReducersTypes) => state.jobsReducers.findOneJob
  );

  const { loading: loadingUpdateJob } = useSelector(
    (state: JobsReducersTypes) => state.jobsReducers.updateJob
  );

  useEffect(() => {
  }, [dispatch, idVacancy]);

  useEffect(() => {
    if (foundJob) {
      reset(foundJob);
      setFormDefaultData(foundJob);
    }
  }, [reset, foundJob]);

  useEffect(() => {
    const basicFieldsValid = valuesFieldsBasic.every((field, index) => {
      return !errors[fieldsBasic[index]] && field;
    });
    setValidBasicBlock(basicFieldsValid);
  }, [fieldsBasic, valuesFieldsBasic, errors]);

  useEffect(() => {
    const descriptionFieldsValid = valuesJobDescription.every(
      (field, index) => {
        return !errors[fieldsJobDescription[index]] && field;
      }
    );
    setValidDescriptionBlock(descriptionFieldsValid);
  }, [fieldsJobDescription, valuesJobDescription, errors]);

  const changeActivePreview = () => setActivePreview((prev) => !prev);

  const disableButtonPreview = () => {
    return !(validBasicBlock && validDescriptionBlock);
  };

  useEffect(() => {
    const disableHTMLScrolling = () => {
      const htmlStyle = document.documentElement.style;
      if (activePreview) {
        htmlStyle.overflow = "hidden";
      } else {
        htmlStyle.overflow = "";
      }
    };
    disableHTMLScrolling();
  }, [activePreview]);

  const onSubmit: SubmitHandler<VacancyFormRePostTypes> = async (data) => {
    const updatedVacancy = RePostVacancy(data, "dsad");

    try {

      setAvailablePublications((prev) => prev - 1);
      setPermissionGoVacancy(true);
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      console.error(errorMessage);
      changeOpenModal();
    }
  };

  useEffect(() => {
    const goToVacancy = () => {
      router.push(`/vacancy/${idVacancy}`);
    };
    if (permissionGoVacancy) {
      goToVacancy();
    }
  }, [permissionGoVacancy, loadingUpdateJob, router, idVacancy]);

  const changeOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    const changeAvailablePublications = () => {
      const availablePublic = localStorage.getItem("availablePublications");
      availablePublic !== null &&
        setAvailablePublications(JSON.parse(availablePublic));
    };

    changeAvailablePublications();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "availablePublications",
      JSON.stringify(availablePublications)
    );
  }, [availablePublications]);

  return (
    <form
      className={cn(styles.form, {
        [styles.formBackgroundDark]: activePreview,
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      {formDefaultData ? (
        <div className={styles.formData}>
          <div className={styles.baseInfo}>
            <h2 className={styles.title}>Basic information</h2>
            <div className={styles.labeledField}>
              <p className={styles.label}>Job title</p>
              <Input<VacancyFormRePostTypes>
                name="name"
                isIcon={false}
                placeholder="Full-stack Engineer"
                register={register}
                error={errors.name}
                className={styles.field}
              />
            </div>
            <div className={styles.labeledFieldOther}>
              <p className={styles.label}>Other</p>
              <div className={styles.fieldWrapper}>
                <Controller
                  name="other"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      valueDefault={formDefaultData?.other}
                      error={errors.other}
                      variant={VARIANT.BIG}
                      onChange={onChange}
                      objValue={value}
                      data={Other}
                      placeholder="Choose a other"
                      enteredValueColor="#1B1E27"
                    />
                  )}
                />
              </div>
            </div>
            <div className={styles.filedTags}>
              {dataTags?.map(({ nameSection, id, disabled, active }) => (
                <CheckboxTag<VacancyFormRePostTypes>
                  register={register}
                  key={id}
                  disabled={disabled}
                  name={nameSection}
                  nameGroup="tags"
                  active={active}
                />
              ))}
            </div>
            <div className={styles.labeledField}>
              <p className={styles.label}>Qualification</p>
              <div className={styles.fieldWrapper}>
                <Controller
                  name="qualification"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      valueDefault={formDefaultData?.qualification}
                      variant={VARIANT.BIG}
                      onChange={onChange}
                      objValue={value}
                      data={Qualification}
                      placeholder="Choose a qualification"
                      enteredValueColor="#1B1E27"
                      error={errors.qualification}
                    />
                  )}
                />
              </div>
            </div>
            <div className={styles.labeledField}>
              <p className={styles.label}>Experience</p>
              <div className={styles.fieldWrapper}>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      valueDefault={formDefaultData?.experience}
                      variant={VARIANT.BIG}
                      onChange={onChange}
                      objValue={value}
                      data={Experience}
                      placeholder="Choose a experience"
                      enteredValueColor="#1B1E27"
                      error={errors.experience}
                    />
                  )}
                />
              </div>
            </div>
            <div className={styles.labeledField}>
              <p className={styles.label}>Type of Employment</p>
              <div className={styles.fieldWrapper}>
                <Controller
                  name="mode"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      valueDefault={formDefaultData?.mode}
                      variant={VARIANT.BIG}
                      onChange={onChange}
                      objValue={value}
                      data={EmploymentType}
                      placeholder="Choose a type of employment"
                      enteredValueColor="#1B1E27"
                      error={errors.mode}
                    />
                  )}
                />
              </div>
              <div className={styles.checkboxWrapper}>
                <label className={styles.checkbox}>
                  <Checkbox<VacancyFormRePostTypes>
                    nameGroup="remote"
                    register={register}
                  />
                  <span>Remote</span>
                </label>
              </div>
            </div>
            <div className={styles.labeledField}>
              <p className={styles.label}>Income level</p>
              <Input<VacancyFormRePostTypes>
                name="salary"
                isIcon={false}
                placeholder="from $10,000"
                register={register}
                error={errors.salary}
                className={styles.field}
              />
            </div>
          </div>
          <div className={styles.posInfo}>
            <h1 className={styles.posInfoTitle}>Tell me about the position</h1>
            {dataTextareas.map(({ title, nameFiledForm, placeholder, id }) => (
              <div key={id} className={styles.textarea}>
                <h2 className={styles.textAreaTitle}>{title}</h2>
                <Textarea<VacancyFormRePostTypes>
                  name={nameFiledForm as keyof VacancyFormRePostTypes}
                  placeholder={placeholder}
                  error={
                    errors[
                      nameFiledForm as keyof VacancyFormRePostTypes
                    ] as FieldError
                  }
                  register={register}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
      <div className={styles.formSubmits}>
        <h3 className={styles.formSubmitsTitle}>Publication</h3>
        <div className={styles.submitsPreview}>
          <div
            className={cn(styles.previewBasicDisabled, {
              [styles.previewBasic]: validBasicBlock,
            })}
          >
            <div className={styles.previewBasicTitle}>Basic information</div>
            <div className={styles.previewBasicText}>
              Specify conditions and requirements
            </div>
          </div>
          <div
            className={cn(styles.previewDescriptionDisabled, {
              [styles.previewDescription]: validDescriptionBlock,
            })}
          >
            <div className={styles.previewDescriptionTitle}>
              Job Description
            </div>
            <div className={styles.previewDescriptionText}>
              Describe what you have to work with
            </div>
          </div>
        </div>
        <Button
          appearance="secondary"
          size="l"
          className={styles.buttonPreview}
          disabled={disableButtonPreview()}
          onClick={changeActivePreview}
        >
          Preview
        </Button>
        <Button
          appearance="primary"
          size="l"
          className={styles.buttonPublish}
          onClick={() => changeOpenModal()}
        >
          Publish
        </Button>
      </div>
      {activePreview && (
        <PreviewVacancy
          basicInformation={valuesFieldsBasic as string[]}
          closePreview={changeActivePreview}
          jobDescription={valuesJobDescription as string[]}
        />
      )}
      {openModal && (
        <Modal title="Publishing" onClose={changeOpenModal}>
          <div className={styles.modalDescription}>
            One publication will be written off from your balance. After
            publication, your vacancy will be displayed on the platform for 30
            days.
          </div>
          <div className={styles.modalLine}></div>
          <div className={styles.modalWithdraw}>
            Withdraw<span>1</span>
          </div>
          <div className={styles.modalContainer}>
            <div className={styles.leftBlock}>
              <span className={styles.leftBlockTitle}>
                Publications available
              </span>
              <span className={styles.leftBlockBalance}>
                {availablePublications}
              </span>
            </div>
          </div>
          <Button
            type="submit"
            appearance={"primary"}
            size={"xl"}
            className={styles.modalButton}
            disabled={availablePublications < 1}
          >
            Publish
          </Button>
        </Modal>
      )}
    </form>
  );
};

export default VacancyFormRePost;
