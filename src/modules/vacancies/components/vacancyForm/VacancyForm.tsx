"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  Controller,
  FieldError,
} from "react-hook-form";
import cn from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import Checkbox from "@/components/Checkbox/Checkbox";
import { vacancyFormSchema } from "@/modules/vacancies/constants/vacancyFormSchema";
import {
  EmploymentType,
  Experience,
  Other,
  Qualification,
  dataTags,
  dataTextareas,
} from "./VacancyFormData";
import CheckboxTag from "@/components/CheckboxTag/CheckboxTag";
import Textarea from "@/components/Textarea/Textarea";
import CardOption from "@/modules/vacancies/components/CardOption/CardOption";
import PreviewVacancy from "@/modules/vacancies/components/PreviewVacancy/PreviewVacancy";
import { VacancyFormTypes } from "@/modules/vacancies/components/vacancyForm/VacancyFormTypes";
import { VARIANT } from "@/components/Select/Select.types";

import styles from "./styles.module.scss";

export const VacancyForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<VacancyFormTypes>({
    resolver: yupResolver(vacancyFormSchema),
    mode: "all",
  });

  const [activePreview, setActivePreview] = useState(false);

  const [validBasicBlock, setValidBasicBlock] = useState(false);
  const [validDescriptionBlock, setValidDescriptionBlock] = useState(false);
  const [validSettingsBlock, setValidSettingsBlock] = useState(false);

  const fieldsBasic: (keyof VacancyFormTypes)[] = useMemo(
    () => [
      "name",
      "other",
      "qualification",
      "experience",
      "typeOfEmloyment",
      "incomeLevel",
    ],
    []
  );

  const valuesFieldsBasic = watch(fieldsBasic);

  useEffect(() => {
    const basicFieldsValid = valuesFieldsBasic.every((field, index) => {
      return !errors[fieldsBasic[index]] && field;
    });
    setValidBasicBlock(basicFieldsValid);
  }, [fieldsBasic, valuesFieldsBasic, errors]);

  const fieldsDesctription: (keyof VacancyFormTypes)[] = useMemo(
    () => ["jobDescription", "requirements", "responsibilities", "terms"],
    []
  );

  const valuesFieldsDesctription = watch(fieldsDesctription);

  useEffect(() => {
    const descriptionFieldsValid = valuesFieldsDesctription.every(
      (field, index) => {
        return !errors[fieldsDesctription[index]] && field;
      }
    );
    setValidDescriptionBlock(descriptionFieldsValid);
  }, [fieldsDesctription, valuesFieldsDesctription, errors]);

  const valueFieldSettings = watch("publishingSettings");

  useEffect(() => {
    const settingFieldValid =
      !errors["publishingSettings"] && valueFieldSettings ? true : false;
    setValidSettingsBlock(settingFieldValid);
  }, [valueFieldSettings, errors.publishingSettings, errors]);

  const disableButtonPreview = () => {
    return validBasicBlock && validDescriptionBlock && validSettingsBlock
      ? false
      : true;
  };

  const onSubmit: SubmitHandler<VacancyFormTypes> = (data) => console.log(data);

  const error: SubmitErrorHandler<VacancyFormTypes> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const htmlStyle = document.documentElement.style;
    if (activePreview) {
      htmlStyle.overflow = "hidden";
    } else {
      htmlStyle.overflow = "";
    }
  }, [activePreview]);

  const changeActivePreview = () => setActivePreview((prev) => !prev);

  return (
    <form
      className={cn(styles.form, {
        [styles.formBackgroundDark]: activePreview,
      })}
      onSubmit={handleSubmit(onSubmit, error)}
    >
      <div className={styles.formData}>
        <div className={styles.baseInfo}>
          <h2 className={styles.title}>Basic information</h2>
          <div className={styles.labeledField}>
            <p className={styles.label}>Job title</p>
            <Input<VacancyFormTypes>
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
              <CheckboxTag<VacancyFormTypes>
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
                name="typeOfEmloyment"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    variant={VARIANT.BIG}
                    onChange={onChange}
                    objValue={value}
                    data={EmploymentType}
                    placeholder="Choose a type of emlpoyment"
                    enteredValueColor="#1B1E27"
                    error={errors.typeOfEmloyment}
                  />
                )}
              />
            </div>
            <div className={styles.checkboxWrapper}>
              <label className={styles.checkbox}>
                <Checkbox<VacancyFormTypes>
                  nameGroup="remote"
                  register={register}
                />
                <span>Remote</span>
              </label>
            </div>
          </div>
          <div className={styles.labeledField}>
            <p className={styles.label}>Income level</p>
            <Input<VacancyFormTypes>
              name="incomeLevel"
              isIcon={false}
              placeholder="from $10,000"
              register={register}
              error={errors.incomeLevel}
              className={styles.field}
            />
          </div>
        </div>
        <div className={styles.posInfo}>
          <h1 className={styles.posInfoTitle}>Tell me about the position</h1>
          {dataTextareas.map(({ title, nameFiledForm, placeholder, id }) => (
            <div key={id} className={styles.textarea}>
              <h2 className={styles.textAreaTitle}>{title}</h2>
              <Textarea<VacancyFormTypes>
                name={nameFiledForm as keyof VacancyFormTypes}
                placeholder={placeholder}
                error={
                  errors[nameFiledForm as keyof VacancyFormTypes] as FieldError
                }
                register={register}
              />
            </div>
          ))}
        </div>
        <div
          className={cn(styles.settings, {
            [styles.settingsError]: errors.publishingSettings,
          })}
        >
          <div className={styles.settingsTitle}>Publishing settings</div>
          <p className={styles.settingsText}>
            Select the required type of accommodation
          </p>
          <div className={styles.settingsCards}>
            <CardOption<VacancyFormTypes>
              numberVacancies={1}
              nameGroup="publishingSettings"
              title="Single occupancy"
              description="Vacancy placement for a period of one month"
              price={10}
              watch={watch}
              value="single"
              register={register}
            />
            <CardOption<VacancyFormTypes>
              numberVacancies={10}
              title="Job package"
              description="Package of ten vacancies with auto-renewal option"
              price={35}
              buttonSale={true}
              watch={watch}
              nameGroup="publishingSettings"
              value="package"
              register={register}
            />
          </div>
          {errors.publishingSettings && (
            <span role="alert" className={styles.settingsErrorMessage}>
              {errors.publishingSettings?.message}
            </span>
          )}
        </div>
      </div>
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
          <div
            className={cn(styles.previewSettingsDisabled, {
              [styles.previewSettings]: validSettingsBlock,
            })}
          >
            <div className={styles.previewSettingsTitle}>
              Publishing settings
            </div>
            <div className={styles.previewSettingsText}>
              Select the type of activity
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
          type="submit"
          appearance="primary"
          size="l"
          className={styles.buttonPublish}
        >
          Publish
        </Button>
      </div>
      {activePreview ? (
        <PreviewVacancy
          basicInformation={valuesFieldsBasic as string[]}
          closePreview={changeActivePreview}
          specification={valuesFieldsDesctription as string[]}
        />
      ) : (
        ""
      )}
    </form>
  );
};
