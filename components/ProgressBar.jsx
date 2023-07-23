import React from "react";
import { useTranslations } from "next-intl";

function ProgressBar({ project }) {
  const t = useTranslations();
  return (
    <div className=' w-full flex flex-col gap-2 text-sm '>
      <div className='h-2 w-full bg-gray-200 rounded'>
        <div
          style={{
            maxWidth: "100%",
            width: `${(project?.totalDonations / project?.goal) * 100}%`,
          }}
          className='h-2  bg-[#d4ee26] rounded'
        ></div>
      </div>

      <div className='grid grid-cols-12'>
        <span className='sm:col-span-10 col-span-9 justify-self-start'>
          {t("Raised")}
        </span>{" "}
        <span className='sm:col-span-2 col-span-3 justify-self-end'>
          {t("Goal")}
        </span>
      </div>

      <div className='grid grid-cols-12'>
        <span className='sm:col-span-10 col-span-9 justify-self-start'>
          <span className='font-bold  text-base sm:text-lg '>$ </span>
          {project?.totalDonations}
        </span>{" "}
        <span className='sm:col-span-2 col-span-3 justify-self-end'>
          <span className='font-bold  text-base sm:text-lg '>$ </span>
          {project?.goal}
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;
