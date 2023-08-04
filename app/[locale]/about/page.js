import React from "react";
import { useTranslations } from "next-intl";

function About() {
  const t = useTranslations();
  return (
    <div className='flex flex-col py-16 px-12 md:py-20 md:px-20 lg:px-28'>
      <div className='p-8'>
        <h1 className='text-4xl md:text-5xl lg:text-7xl text-center'>
          {t("About_Givingly")}
        </h1>
      </div>

      <div className='flex flex-col gap-6 md:flex-row md:pt-8 lg:gap-8 lg:flex-col lg:pt-12'>
        <div className='flex-1 p-4 shadow-lg'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl text-center font-bold'>
            {t("mission_title")}
          </h1>
          <div className='flex justify-center items-center'>
            <img
              src='https://www.svgrepo.com/show/477511/target-and-arrow.svg'
              alt=' Our Mission Icon'
              className='h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
            />
          </div>
          <p className='p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify'>
            {t("mission_content")}
          </p>
        </div>

        <div className='flex-1 p-4 shadow-lg'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl text-center font-bold'>
            {t("vision_title")}
          </h1>

          <div className='flex justify-center items-center'>
            <img
              src='https://www.svgrepo.com/show/447665/idea-bulb-glow.svg'
              alt='Our Vision Icon'
              className='h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
            />
          </div>
          <p className='p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify'>
            {t("vision_content")}
          </p>
        </div>
      </div>

      <div className='p-8 pt-12 shadow-lg'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-center font-bold'>
          {t("values_title")}
        </h1>
        <br></br>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='p-4 shadow-md'>
            <h1 className='text-xl md:text-xl lg:text-3xl text-center '>
              {t("value_one_title")}
            </h1>
            <div className='flex justify-center items-center'>
              <img
                src='https://www.svgrepo.com/show/307123/spotlight-stage-celebrity-famous.svg'
                alt=' Respect for Individuals Icon'
                className='h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
              />
            </div>
            <p className='p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify'>
              {t("value_one_content")}
            </p>
          </div>
          <div className='p-4 shadow-md'>
            <h1 className='text-xl md:text-xl lg:text-3xl text-center '>
              {t("value_two_title")}
            </h1>
            <div className='flex justify-center items-center'>
              <img
                src='https://www.svgrepo.com/show/307344/happy-crowd-happy-happiness-content.svg'
                alt=' Service to the Community Icon'
                className='h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
              />
            </div>
            <p className='p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify'>
              {t("value_two_content")}
            </p>
          </div>
          <div className='p-4 shadow-md'>
            <h1 className='text-xl md:text-xl lg:text-3xl text-center '>
              {t("value_three_title")}
            </h1>
            <div className='flex justify-center items-center'>
              <img
                src='https://www.svgrepo.com/show/307244/conversation-confer-consult-speak.svg'
                alt=' Transparency Icon'
                className='h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
              />
            </div>
            <p className='p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify'>
              {t("value_three_content")}
            </p>
          </div>
          <div className='p-4 shadow-md'>
            <h1 className='text-xl md:text-xl lg:text-3xl text-center '>
              {t("value_four_title")}
            </h1>
            <div className='flex justify-center items-center'>
              <img
                src='https://www.svgrepo.com/show/307382/joy-joyful-enjoy.svg'
                alt=' Goodness and Enthusiasm Icon'
                className='h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
              />
            </div>
            <p className='p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify'>
              {t("value_four_content")}
            </p>
          </div>
        </div>
      </div>
      <div className=' pt-16'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl text-center'>
          {t("why_givingly")}
        </h1>
        <br></br>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='p-4 shadow-lg'>
            <h1 className='text-xl md:text-xl lg:text-3xl text-center italic'>
              {t("why_one_title")}
            </h1>
            <div className='flex justify-center items-center'>
              <img
                src='https://www.svgrepo.com/show/307234/compare-and-contrast-difference-compare-different.svg'
                alt='Diversity and Inclusion Icon'
                className='h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
              />
            </div>
            <p className='p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify'>
              {t("why_one_content")}
            </p>
          </div>
          <div className='p-4 shadow-lg'>
            <h1 className='text-xl md:text-xl lg:text-3xl text-center italic'>
              {t("why_two_title")}
            </h1>
            <div className='flex justify-center items-center'>
              <img
                src='https://www.svgrepo.com/show/307233/community-people-friends-group.svg'
                alt='Network of Goodness Icon'
                className='h-16 w-16 md:h-20 md:w-20 lg:h-28 lg:w-28'
              />
            </div>
            <p className='p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify'>
              {t("why_two_content")}
            </p>
          </div>
          <div className='p-4 shadow-lg'>
            <h1 className='text-xl md:text-xl lg:text-3xl text-center italic'>
              {t("why_three_title")}
            </h1>
            <div className='flex justify-center items-center'>
              <img
                src='https://www.svgrepo.com/show/247603/hand-shake-handshake.svg'
                alt='Transparency and Reliability Icon'
                className='h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
              />
            </div>
            <p className='p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify'>
              {t("why_three_content")}
            </p>
          </div>
          <div className='p-4 shadow-lg'>
            <h1 className='text-xl md:text-xl lg:text-3xl text-center italic'>
              {t("why_four_title")}
            </h1>
            <div className='flex justify-center items-center'>
              <img
                src='https://www.svgrepo.com/show/247615/analytics.svg'
                alt='Impact-driven Results Icon'
                className='h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
              />
            </div>
            <p className='p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify'>
              {t("why_four_content")}
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center py-6 px-4 md:py-8 md:px-4 lg:px-20 pt-16'>
        <div className='mb-4'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl text-center'>
            {t("support_title")}
          </h1>
        </div>

        <div className='mb-4'>
          <img
            src='https://www.svgrepo.com/show/307408/mutual-love-reciprocity-relationship-kindness.svg'
            alt='How Can You Support Icon'
            className='h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
          />
        </div>

        <div className='text-center px-2 md:px-6 lg:px-20'>
          <p className='text-sm md:text-base lg:text-lg text-justify'>
            {t("support_content")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
