"use client";

import React, { useEffect, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTonAddress } from "@tonconnect/ui-react";
import { useDispatch, useSelector } from "react-redux";

import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import TextArea from "@/components/Textarea/Textarea";
import Button from "@/components/Button/Button";
import { schema } from "./CompanyCreationSchemaYup";
import { city, industry, size } from "./CompanyCreationData";
import { createCompanyThunk } from "@/lib/features/companies/createCompany/createCompanyThunk";
import { AppDispatch } from "@/lib/store";

import { CompanyCreationFormTypes } from "./CompanyCreationFormTypes";
import { VARIANT } from "@/components/Select/Select.types";
import { CompaniesReducersTypes } from "@/lib/features/companies/types";

import LogoEmpty from "@/assets/svgs/logoEmpty.svg";
import Question from "@/assets/images/Question.png";
import { IconButton } from "@/assets/svgs/IconButton";

import styles from "./companyCreation.module.scss";

const Company: React.FC = () => {
  const [links, setLinks] = useState<{ id: string; value: string | null }[]>(
    []
  );
  const [permissionGoCompany, setPermissionGoCompany] = useState(false);
  const [activeLogo, setActiveLogo] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyCreationFormTypes>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const router = useRouter();
  const linkLogoValue = watch("logo");
  const userAddress = useTonAddress();

  useEffect(() => {
    const changeActiveLogo = () => {
      if (linkLogoValue && !errors.linkLogo) {
        setActiveLogo(true);
      } else {
        setActiveLogo(false);
      }
    };
    changeActiveLogo();
  }, [linkLogoValue, errors.linkLogo]);

  const changeActiveQuestion = () => {
    setActiveQuestion((prev) => !prev);
  };

  const addLink = () => {
    setLinks((prev) => [...prev, { id: uuid(), value: null }]);
  };

  useEffect(() => {
    const createFieldLink = (
      arrLinks: { id: string; value: string | null }[]
    ) => {
      if (arrLinks.length > 0) {
        setValue(
          `link-${arrLinks.length - 1}`,
          arrLinks[arrLinks.length - 1].value
        );
      }
    };

    createFieldLink(links);
  }, [links, setValue]);

  const companyCreated = useSelector(
    (state: CompaniesReducersTypes) =>
      state.companiesReducers.createCompany.companyCreated
  );

  const onSubmit: SubmitHandler<CompanyCreationFormTypes> = async (data) => {
    console.log(data);

    const newCompany = {
      logo: data.logo ?? "",
      title: data.title,
      description: data.description,
      city: data.city ?? "",
      sizeCompany: data.sizeCompany ?? "",
      industry: data.industry ?? "",
      walletAddress: userAddress,
      contactLinks: {
        telegram: data.telegram ?? "",
        twitter: "",
        site: data.link ?? "",
      },
    };
    await dispatch(createCompanyThunk(newCompany));
    setPermissionGoCompany(true);
  };

  useEffect(() => {
    const goToCompany = () => {
      router.push(`/company/${companyCreated?.id}`);
    };
    if (permissionGoCompany) {
      goToCompany();
    }
  }, [permissionGoCompany, companyCreated, router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.canvas}>
      <div className={styles.canvasWrapper}>
        <div className={styles.wrapperBlockLinks}>
          <Link className={styles.blockLink} href="/">
            Main
          </Link>
          <span className={styles.blockSlash}>/</span>
          <Link className={styles.blockLinkCurrent} href="/company-creation">
            Company creation
          </Link>
        </div>
        <h1 className={styles.blockTitle}>
          <span className={styles.blockTitleText}>Company creation</span>
          <Button
            appearance="primary"
            size="l"
            type="submit"
            className={styles.buttonStyle}
          >
            Create a company
          </Button>
        </h1>
        <div className={styles.wrapperBlockMain}>
          <main className={styles.main}>
            <section className={styles.blockBasicInformation}>
              <h2 className={styles.informationTitle}>Basic information</h2>
              <div className={styles.informationName}>
                <span className={styles.nameTitle}>Company name</span>
                <div className={styles.informationInput}>
                  <Input<CompanyCreationFormTypes>
                    name="title"
                    placeholder="Stellar"
                    register={register}
                    error={errors.companyName}
                  />
                </div>
              </div>
              <div className={styles.informationSelect}>
                <span className={styles.selectTitle}>Industry</span>
                <div className={styles.selectInput}>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <div>
                          <Select
                            color="#1B1E27"
                            variant={VARIANT.BIG}
                            onChange={onChange}
                            objValue={value}
                            data={industry}
                            placeholder="Choose a industry"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div className={styles.informationSelect}>
                <span className={styles.selectTitle}>Company size</span>
                <div className={styles.selectInput}>
                  <Controller
                    name="sizeCompany"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <div>
                          <Select
                            color="#1B1E27"
                            variant={VARIANT.BIG}
                            onChange={onChange}
                            objValue={value}
                            data={size}
                            placeholder="Choose a size company"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div className={styles.description}>
                <span className={styles.descriptionTitle}>
                  Company Description
                </span>
                <TextArea<CompanyCreationFormTypes>
                  register={register}
                  name="description"
                  placeholder="Describe the company's activities"
                  error={errors.description}
                />
              </div>
            </section>
            <section className={styles.blockContacts}>
              <h2 className={styles.contactsTitle}>Contacts</h2>
              <div className={styles.contactsSelect}>
                <span className={styles.selectTitle}>City</span>
                <div className={styles.selectInput}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <div>
                          <Select
                            variant={VARIANT.BIG}
                            color="#1B1E27"
                            onChange={onChange}
                            objValue={value}
                            data={city}
                            placeholder="Choose a city"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div className={styles.contactsWrapperInput}>
                <span className={styles.inputTitle}>Web site</span>
                <div className={styles.contactsInput}>
                  <Input<CompanyCreationFormTypes>
                    name="link"
                    placeholder="stellar.org"
                    register={register}
                    error={errors.link}
                  />
                </div>
              </div>
              <div className={styles.contactsWrapperInput}>
                <span className={styles.inputTitle}>Telegram</span>
                <div className={styles.contactsInput}>
                  <Input<CompanyCreationFormTypes>
                    name="telegram"
                    placeholder="t.me/stellar"
                    register={register}
                    error={errors.telegram}
                  />
                </div>
              </div>
              {links.map((link, index) => (
                <div key={link.id} className={styles.contactsWrapperInput}>
                  <div className={styles.contactsInput}>
                    <Input<CompanyCreationFormTypes>
                      name={`link-${index}`}
                      placeholder="Paste link"
                      register={register}
                    />
                  </div>
                </div>
              ))}
              <div className={styles.contactsButton}>
                <Button
                  onClick={addLink}
                  size={"s"}
                  appearance={"ghost"}
                  startIcon={<IconButton />}
                >
                  Add a link
                </Button>
              </div>
            </section>
          </main>
          <aside className={styles.asideCreationLogo}>
            {!activeLogo ? (
              <Image
                className={styles.logoEmpty}
                src={LogoEmpty}
                priority
                alt="LogoEmpty"
              />
            ) : (
              <Image
                src={linkLogoValue?.startsWith("https") ? linkLogoValue : "/"}
                width={320}
                height={320}
                alt="Error loading image"
              />
            )}
            <span className={styles.creationLogoText}>Image link</span>
            <div className={styles.creationLogoInput}>
              <Input<CompanyCreationFormTypes>
                name="logo"
                placeholder="Insert link"
                register={register}
                error={errors.logo}
              />
              <Image
                onClick={() => changeActiveQuestion()}
                src={Question}
                priority
                alt={"Question"}
                className={styles.inputQuestion}
              />
              <div
                className={cn(styles.infoQuestion, {
                  [styles.questionActive]: activeQuestion,
                })}
              >
                The logo image must have a width and height of 320 px
              </div>
            </div>
          </aside>
        </div>
      </div>
    </form>
  );
};

export default Company;
