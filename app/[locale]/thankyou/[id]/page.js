"use client";
import React from "react";
import WithAuth from "@/components/AuthanticatedRoute";
import Loading from "@/app/[locale]/loading";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Link from "next-intl/link";
function Thankyou(props) {
  const locale = useLocale();
  const { id } = useParams();
  const t = useTranslations();
  if (props.loading || !props.user)
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  return (
    <>
      <div className='h-full w-full pt-24  flex flex-col justify-end items-center thankyou_mobile pb-8'>
        <div className='thankyou flex flex-col justify-end items-center w-full'>
          <div className='flex flex-col gap-4 '>
            <h1 className='font-bold text-3xl'>{t("Thank you")}</h1>
            <h3 className='font-bold sm:text-3xl text-sm text-center '>
              {t("for supporting us!")}
            </h3>
          </div>
          <div className='flex flex-col lg:flex-row justify-center  items-center  pt-4 w-full'>
            <div className=' w-full p-2 flex lg:justify-end justify-center items-center'>
              <Link
                className='w-full md:w-1/2 inline-flex justify-center items-center rounded-md border shadow-sm px-4 py-2 sm:px-10 sm:py-4  bg-black text-xl  text-white  focus:outline-none  '
                href={`/project/${id}`}
                locale={locale}
              >
                {t("Make another donation")}
              </Link>
            </div>
            <div className=' w-full p-2 flex lg:justify-start justify-center items-center'>
              <Link
                className='w-full md:w-1/2 inline-flex justify-center items-center rounded-md border  shadow-sm px-4 py-2 sm:px-10 sm:py-4  bg-white text-xl  text-black  focus:outline-none  '
                href='/projects'
                locale={locale}
              >
                {t("Go to the Home Page")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WithAuth(Thankyou);
