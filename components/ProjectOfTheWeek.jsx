import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { useTranslations } from "next-intl";

function ProjectOfTheWeek({ data }) {
  const t = useTranslations();
  return (
    <div>
      {" "}
      <div className='grid grid-cols-12 gap-6 border-b-2 pb-12 '>
        <div className='w-full flex flex-col justify-center gap-12 md:pt-0 sm:col-span-7 col-span-12  '>
          <h1 className='lg:text-6xl text-4xl sm:text-5xl font-bold'>
            {t("Project Of The Week")}
          </h1>
          <div className='w-full'>
            {" "}
            <Link
              key={data[0]?.id}
              className='block py-2  '
              href={`/project/${data[0]?.id}`}
            >
              <div className='relative sm:h-[30dvh] h-[30svh] w-full'>
                <Image
                  src={data[0]?.img}
                  layout='fill'
                  className='rounded-xl drop-shadow-lg'
                  objectFit='cover'
                  alt='Picture of the author'
                />
              </div>
            </Link>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 sm:col-span-5 col-span-12  justify-end items-start  '>
          <h3 className='font-bold lg:text-4xl md:text-3xl text-2xl '>
            {data[0]?.title}
          </h3>
          <p className='text-sm'>{data[0]?.desc}</p>

          <div className=' w-full flex flex-col gap-2 text-sm'>
            <div className='h-2 w-full bg-gray-200 rounded'>
              <div
                style={{
                  maxWidth: "100%",
                  width: `${(data[0]?.totalDonations / data[0]?.goal) * 100}%`,
                }}
                className='h-2  bg-[#d4ee26] rounded'
              ></div>
            </div>

            <div className='grid grid-cols-12 justify-end'>
              <span className='col-span-10'>{t("Raised")}</span>{" "}
              <span className='col-span-2 justify-self-end'>{t("Goal")}</span>
            </div>

            <div className='grid grid-cols-12'>
              <span className='col-span-10'>
                <span className='font-bold text-lg '>$ </span>
                {data[0]?.totalDonations}
              </span>{" "}
              <span className='col-span-2 justify-self-end'>
                <span className='font-bold text-lg '>$</span> {data[0]?.goal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectOfTheWeek;
