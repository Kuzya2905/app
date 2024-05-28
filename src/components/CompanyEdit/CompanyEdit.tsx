"use client";

import React, { useEffect, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { useIsConnectionRestored, useTonWallet } from "@tonconnect/ui-react";

import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import TextArea from "@/components/Textarea/Textarea";
import Button from "@/components/Button/Button";
import { schema } from "./CompanyEditSchemaYup";
import { city, industry, size } from "./CompanyEditData";

import { CompanyEditFormTypes } from "./CompanyEditFormTypes";
import { VARIANT } from "@/components/Select/Select.types";

import LogoEmpty from "@/assets/svgs/logoEmpty.svg";
import Question from "@/assets/images/Question.png";
import { IconButton } from "@/assets/svgs/IconButton";

import styles from "./CompanyEdit.module.scss";

const CompanyEdit: React.FC = () => {
  const [links, setLinks] = useState<{ id: string; value: string | null }[]>(
    []
  );

  const [activeLogo, setActiveLogo] = useState<boolean>(false);

  const [activeQuestion, setActiveQuestion] = useState<boolean>(false);

  const [isWalletLoaded, setIsWalletLoaded] = useState<boolean>(false);

  const wallet = useTonWallet();
  const router = useRouter();
  const connectionRestored = useIsConnectionRestored();

  const {
    register,
    watch,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyEditFormTypes>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      industry: "IT",
      size: "1 - 50",
      city: "Los-Angeles",
      linkLogo: null,
    },
  });

  useEffect(() => {
    const formDataCompany = localStorage.getItem("formDataCompany");
    if (formDataCompany) {
      reset(JSON.parse(formDataCompany));
    }
  }, [reset]);

  const linkLogoValue = watch("linkLogo");

  useEffect(() => {
    if(connectionRestored) {
      if(!wallet) {
        router.push('/')
      } else {
        setIsWalletLoaded(true)
      }
    }    
  },[connectionRestored,wallet]);
  

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

  const onSubmit: SubmitHandler<CompanyEditFormTypes> = (data) => {
    console.log(data);
    localStorage.setItem("formDataCompany", JSON.stringify(data));
  };

  return (
    <>{
      isWalletLoaded ? (
        <form onSubmit={handleSubmit(onSubmit, error)} className={styles.canvas}>
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
              <Link className={styles.blockLink} href="">
                Stellar
              </Link>
              <span className={styles.blockSlash}>/</span>
              <Link className={styles.blockLinkCurrent} href="">
                Edit
              </Link>
            </div>
            <h1 className={styles.blockTitle}>
              <span className={styles.blockTitleText}>Editing</span>
              <Button
                appearance="primary"
                size="l"
                type="submit"
                className={styles.buttonStyle}
              >
                Save changes
              </Button>
            </h1>
            <div className={styles.wrapperBlockMain}>
              <main className={styles.main}>
                <section className={styles.blockBasicInformation}>
                  <h2 className={styles.informationTitle}>Basic information</h2>
                  <div className={styles.informationName}>
                    <span className={styles.nameTitle}>Company name</span>
                    <div className={styles.informationInput}>
                      <Input<CompanyEditFormTypes>
                        name="companyName"
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
                                placeholder="IT"
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
                        name="size"
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
                                placeholder="1 - 50"
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
                    <TextArea<CompanyEditFormTypes>
                      register={register}
                      name="companyDescription"
                      placeholder="Describe the company's activities"
                      error={errors.companyDescription}
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
                                color="#1B1E27"
                                variant={VARIANT.BIG}
                                onChange={onChange}
                                objValue={value}
                                data={city}
                                placeholder="Los-Angeles"
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
                      <Input<CompanyEditFormTypes>
                        name="webSite"
                        placeholder="stellar.org"
                        register={register}
                        error={errors.webSite}
                      />
                    </div>
                  </div>
                  <div className={styles.contactsWrapperInput}>
                    <span className={styles.inputTitle}>Telegram</span>
                    <div className={styles.contactsInput}>
                      <Input<CompanyEditFormTypes>
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
                        <Input<CompanyEditFormTypes>
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
                  <Input<CompanyEditFormTypes>
                    name="linkLogo"
                    placeholder="Insert link"
                    register={register}
                    error={errors.linkLogo}
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
      ) : (
        <div className={styles.stub}></div>
      )
    }</>

  );
};

export default CompanyEdit;
