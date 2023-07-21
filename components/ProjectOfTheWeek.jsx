import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";

function ProjectOfTheWeek({ data }) {
  return (
    <div>
      {" "}
      <div className='grid grid-cols-12 gap-6 border-b-2 pb-12 '>
        <div className='w-full flex flex-col justify-center gap-12 md:pt-0 sm:col-span-7 col-span-12  '>
          <h1 className='text-6xl font-bold'>Project of the week</h1>
          <div className='w-full'>
            {" "}
            <Link
              key={data[0]?.id}
              className='block py-2 px-3 lg:w-2/4'
              href={`/project/${data[0]?.id}`}
            >
              <Image
                className='border-2 '
                src={data[0]?.img}
                layout='responsive'
                width={300}
                height={200}
                alt='Picture of the author'
              />
            </Link>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 sm:col-span-5 col-span-12  justify-end  '>
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

            <div className='grid grid-cols-12'>
              <span className='col-span-11'>Raised</span>{" "}
              <span className='col-span-1'>Goal:</span>
            </div>

            <div className='grid grid-cols-12'>
              <span className='col-span-11'>${data[0]?.totalDonations}</span>{" "}
              <span className='col-span-1'>${data[0]?.goal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectOfTheWeek;
