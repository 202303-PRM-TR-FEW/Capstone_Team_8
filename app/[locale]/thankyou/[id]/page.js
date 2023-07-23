"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import WithAuth from "@/components/AuthanticatedRoute";
import Loading from "@/app/[locale]/loading";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
function Thankyou(props) {
  const { id } = useParams();
  const t = useTranslations();
  if (props.loading || !props.user)
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  return (
    <PageLayout>
      <div className='h-[100vh] w-full p-24'>
        <div className='thankyou flex flex-col justify-end items-center   w-full'>
          <div className='flex flex-col gap-4 '>
            <h1 className='font-bold text-3xl'>{t("Thank you")}</h1>
            <h3 className='font-bold text-3xl'>{t("for supporting us!")}</h3>
          </div>
          <div className='flex flex-col lg:flex-row justify-center  items-center  pt-4 w-full gap-6'>
            <div className='w-full'>
              <Link
                className='w-full inline-flex justify-center rounded-md border shadow-sm sm:px-6 sm:py-2 bg-black text-xl  text-white  focus:outline-none  '
                href={`/project/${id}`}
              >
                {t("Make another donation")}
              </Link>
            </div>
            <div className='w-full'>
              <Link
                className='w-full inline-flex justify-center rounded-md border  shadow-sm sm:px-8 sm:py-2 bg-white text-xl  text-black  focus:outline-none  '
                href='/projects'
              >
                {t("Go to the Home Page")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default WithAuth(Thankyou);