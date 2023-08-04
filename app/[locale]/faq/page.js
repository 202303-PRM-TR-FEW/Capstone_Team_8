"use client";
import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

function Faq() {
  const locale = useLocale();
  const t = useTranslations();
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <div className='flex flex-col justify-center items-start py-24 gap-4 sm:min-h-[95vh] min-h-[95svh] px-4 sm:px-6 w-screen'>
      <h1 className='text-left text-2xl font-bold pb-4'>
        {t("most_popular_questions")}
      </h1>

      <div className='border-2 border-gray-20 w-full flex flex-col justify-start rounded'>
        <div className='flex justify-between px-2'>
          {" "}
          <button
            className='w-full px-5 py-3 outline-none focus:outline-none'
            onClick={() => toggleSection("section1")}
          >
            <p className='font-semibold text-left w-full '>{t("faq_q1")}</p>
          </button>
          {openSection == "section1" ? (
            <button className='text-2xl'>-</button>
          ) : (
            <button className='text-2xl'>+</button>
          )}
        </div>

        {openSection === "section1" && (
          <div className='p-5  border-gray-200 flex justify-start w-full border-t-2'>
            <p className='w-full text-left'>{t("faq_a1")}</p>
          </div>
        )}
      </div>
      <div className='border-2 border-gray-20 w-full flex flex-col justify-start rounded'>
        <div className='flex justify-between px-2'>
          {" "}
          <button
            className='w-full px-5 py-3 outline-none focus:outline-none'
            onClick={() => toggleSection("section2")}
          >
            <p className='font-semibold text-left w-full '>{t("faq_q2")}</p>
          </button>
          {openSection == "section2" ? (
            <button className='text-2xl'>-</button>
          ) : (
            <button className='text-2xl'>+</button>
          )}
        </div>

        {openSection === "section2" && (
          <div className='p-5  border-gray-200 flex justify-start w-full border-t-2'>
            <p className='w-full text-left'>{t("faq_a2")}</p>
          </div>
        )}
      </div>

      <div className='border-2 border-gray-20 w-full flex flex-col justify-start rounded'>
        <div className='flex justify-between px-2'>
          {" "}
          <button
            className='w-full px-5 py-3 outline-none focus:outline-none'
            onClick={() => toggleSection("section3")}
          >
            <p className='font-semibold text-left w-full '>{t("faq_q3")}</p>
          </button>
          {openSection == "section3" ? (
            <button className='text-2xl'>-</button>
          ) : (
            <button className='text-2xl'>+</button>
          )}
        </div>

        {openSection === "section3" && (
          <div className='p-5  border-gray-200 flex justify-start w-full border-t-2'>
            <p className='w-full text-left'>{t("faq_a3")}</p>
          </div>
        )}
      </div>

      <div className='border-2 border-gray-20 w-full flex flex-col justify-start rounded'>
        <div className='flex justify-between px-2'>
          {" "}
          <button
            className='w-full px-5 py-3 outline-none focus:outline-none'
            onClick={() => toggleSection("section4")}
          >
            <p className='font-semibold text-left w-full '>{t("faq_q4")}</p>
          </button>
          {openSection == "section4" ? (
            <button className='text-2xl'>-</button>
          ) : (
            <button className='text-2xl'>+</button>
          )}
        </div>

        {openSection === "section4" && (
          <div className='p-5  border-gray-200 flex justify-start w-full border-t-2'>
            <p className='w-full text-left'>{t("faq_a4")}</p>
          </div>
        )}
      </div>

      <div className='border-2 border-gray-20 w-full flex flex-col justify-start rounded'>
        <div className='flex justify-between px-2'>
          {" "}
          <button
            className='w-full px-5 py-3 outline-none focus:outline-none'
            onClick={() => toggleSection("section5")}
          >
            <p className='font-semibold text-left w-full '>{t("faq_q5")}</p>
          </button>
          {openSection == "section5" ? (
            <button className='text-2xl'>-</button>
          ) : (
            <button className='text-2xl'>+</button>
          )}
        </div>

        {openSection === "section5" && (
          <div className='p-5  border-gray-200 flex justify-start w-full border-t-2'>
            <p className='w-full text-left'>{t("faq_a5")}</p>
          </div>
        )}
      </div>

      <div className='border-2 border-gray-20 w-full flex flex-col justify-start rounded'>
        <div className='flex justify-between px-2'>
          {" "}
          <button
            className='w-full px-5 py-3 outline-none focus:outline-none'
            onClick={() => toggleSection("section6")}
          >
            <p className='font-semibold text-left w-full '>{t("faq_q6")}</p>
          </button>
          {openSection == "section6" ? (
            <button className='text-2xl'>-</button>
          ) : (
            <button className='text-2xl'>+</button>
          )}
        </div>

        {openSection === "section6" && (
          <div className='p-5  border-gray-200 flex justify-start w-full border-t-2'>
            <p className='w-full text-left'>{t("faq_a6")}</p>
          </div>
        )}
      </div>

      <div className='border-2 border-gray-20 w-full flex flex-col justify-start rounded'>
        <div className='flex justify-between px-2'>
          {" "}
          <button
            className='w-full px-5 py-3 outline-none focus:outline-none'
            onClick={() => toggleSection("section7")}
          >
            <p className='font-semibold text-left w-full '>{t("faq_q7")}</p>
          </button>
          {openSection == "section7" ? (
            <button className='text-2xl'>-</button>
          ) : (
            <button className='text-2xl'>+</button>
          )}
        </div>

        {openSection === "section7" && (
          <div className='p-5  border-gray-200 flex justify-start w-full border-t-2'>
            <p className='w-full text-left'>{t("faq_a7")}</p>
          </div>
        )}
      </div>

      <div className='border-2 border-gray-20 w-full flex flex-col justify-start rounded'>
        <div className='flex justify-between px-2'>
          {" "}
          <button
            className='w-full px-5 py-3 outline-none focus:outline-none'
            onClick={() => toggleSection("section8")}
          >
            <p className='font-semibold text-left w-full '>{t("faq_q8")}</p>
          </button>
          {openSection == "section8" ? (
            <button className='text-2xl'>-</button>
          ) : (
            <button className='text-2xl'>+</button>
          )}
        </div>

        {openSection === "section8" && (
          <div className='p-5  border-gray-200 flex justify-start w-full border-t-2'>
            <p className='w-full text-left'>{t("faq_a8")}</p>
          </div>
        )}
      </div>

      <div className='border-2 border-gray-20 w-full flex flex-col justify-start rounded'>
        <div className='flex justify-between px-2'>
          {" "}
          <button
            className='w-full px-5 py-3 outline-none focus:outline-none'
            onClick={() => toggleSection("section9")}
          >
            <p className='font-semibold text-left w-full '>{t("faq_q9")}</p>
          </button>
          {openSection == "section9" ? (
            <button className='text-2xl'>-</button>
          ) : (
            <button className='text-2xl'>+</button>
          )}
        </div>

        {openSection === "section9" && (
          <div className='p-5  border-gray-200 flex justify-start w-full border-t-2'>
            <p className='w-full text-left'>{t("faq_a9")}</p>
          </div>
        )}
      </div>

      <div className='border-2 border-gray-20 w-full flex flex-col justify-start rounded'>
        <div className='flex justify-between px-2'>
          {" "}
          <button
            className='w-full px-5 py-3 outline-none focus:outline-none'
            onClick={() => toggleSection("section10")}
          >
            <p className='font-semibold text-left w-full '>{t("faq_q10")} </p>
          </button>
          {openSection == "section10" ? (
            <button className='text-2xl'>-</button>
          ) : (
            <button className='text-2xl'>+</button>
          )}
        </div>

        {openSection === "section10" && (
          <div className='p-5  border-gray-200 flex justify-start w-full border-t-2'>
            <p className='w-full text-left'>{t("faq_a10")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Faq;
