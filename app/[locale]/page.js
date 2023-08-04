"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next-intl/link";
const Welcome = () => {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <>
      <div className=' w-full  bg-[#d4ee26] h-[100vh] lg:px-28  lg:py-56 py-28 '>
        <div className='welcome-desktop w-full  h-full hidden lg:flex justify-end lg:justify-start  items-end lg:items-center  '>
          <div className='lg:justify-self-end'></div>
          <div className='lg:w-1/3  flex gap-8 flex-col lg:ml-36 ml-6 mr-6'>
            <h1 className='text-8xl font-bold'>Givingly</h1>
            <h2 className='text-3xl'>
              {t("Supporting great causes made easy")}
            </h2>

            <p>
              {t(
                "We helped over 3,500 projects and causes! Sign in today and get your idea kicked off or support others kick off their amazing projects"
              )}
            </p>
            <Link
              className='bg-black w-full p-2 text-white rounded mt-4 hover:text-[#d4ee26] text-center '
              href='/navigation'
              locale={locale}
            >
              {t("Start today")}
            </Link>
            <Link
              className='bg-black w-full p-2  mt-4 text-white rounded text-center hover:text-[#d4ee26] '
              href='/success'
              locale={locale}
            >
              {t("See Success Stories")}
            </Link>
          </div>
        </div>

        <div className='welcome-tablet  w-full hidden h-full md:flex  justify-end lg:hidden items-end   '>
          <div className=' w-1/2 flex gap-8 flex-col lg:ml-36 ml-6 mr-6'>
            <h1 className='text-8xl font-bold'>Givingly</h1>
            <h2 className='text-3xl '>
              {t("Supporting great causes made easy")}
            </h2>
            <p>
              {t(
                "We helped over 3,500 projects and causes! Sign in today and get your idea kicked off or support others kick off their amazing projects"
              )}
            </p>
            <Link
              className='bg-black w-full p-2 text-center text-white rounded mt-4 hover:text-[#d4ee26] '
              href='/navigation'
              locale={locale}
            >
              {t("Start today")}
            </Link>
            <Link
              className='bg-black w-full p-2  mt-4 text-white rounded text-center hover:text-[#d4ee26] '
              href='/success'
              locale={locale}
            >
              {t("See Success Stories")}
            </Link>
          </div>
        </div>

        <div className='welcome-mobile w-full  flex md:hidden justify-center  px-12 h-full     '>
          <div className=' w-full flex  flex-col justify-between  '>
            <h1 className='text-6xl font-bold px-4 text-center'>Givingly</h1>

            <div className='text-center flex flex-col px-4 w-full'>
              {" "}
              <h2 className='text-2xl'>
                {t("Supporting great causes made easy")}
              </h2>
              <p>
                {t(
                  "We helped over 3,500 projects and causes! Sign in today and get your idea kicked off or support others kick off their amazing projects"
                )}
              </p>
              <Link
                className='bg-black w-full p-2 text-white rounded mt-4 text-center hover:text-[#d4ee26] '
                href='/navigation'
                locale={locale}
              >
                {t("Start today")}
              </Link>
              <Link
                className='bg-black w-full p-2  mt-4 text-white rounded text-center hover:text-[#d4ee26] '
                href='/success'
                locale={locale}
              >
                {t("See Success Stories")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
