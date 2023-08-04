"use client";
import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "@/firebase/firebase";
import {
  openAddProject,
  closeAddProject,
} from "../features/startproject/kickoff";
import Newsletter from "@/components/Newsletter";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next-intl/client";
import Link from "next-intl/link";
const Navigation = () => {
  const locale = useLocale();
  const [form, setForm] = useState(false);
  const router = useRouter();
  const kickOffModalStatus = useSelector(
    (state) => state.isStartProjectOpen.modalOpen
  );
  const handleKickOffProject = () => {
    if (auth.currentUser == null) {
      alert("To start a project you need  to login!");
      router.push("/login", { locale: locale });
    }

    if (auth.currentUser) {
      dispatch(openAddProject());
    }
    router.push("/myprojects", { locale: locale });
  };
  const dispatch = useDispatch();
  const handleClick = () => {
    setForm(true);
  };
  const t = useTranslations();
  return (
    <>
      {" "}
      {form && <Newsletter setForm={setForm} />}
      <div className='flex flex-col justify-start sm:justify-center items-center h-[calc(100vh-64px)]  overflow-y-scroll   w-full px-12 py-6 '>
        <div className='flex flex-col lg:flex-row justify-evenly items-center w-full gap-12'>
          <div className='w-full flex justify-between flex-col gap-24'>
            <h1 className='text-center text-xl'>{t("i_want")}</h1>
            <div className='border-b-2 w-full text-center pb-4 cursor-pointer hover:text-[#d4ee26] hover:drop-shadow-sm'>
              <Link href='/projects' locale={locale}>
                <span className='text-3xl font-bold'> {t("support")} </span>{" "}
                <br /> {t("other_projects")}
              </Link>
            </div>
            <div className='w-full text-center cursor-pointer hover:text-[#d4ee26] hover:drop-shadow-sm border-b-2 lg:border-b-0 pb-4'>
              <button onClick={handleKickOffProject}>
                <span className='text-3xl font-bold '>
                  {t("kickoff_project")}{" "}
                </span>{" "}
                <br /> {t("newKickoff")}
              </button>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center bg-black rounded text-white p-6 gap-4 md:w-2/3 w-full'>
            <div className='text-center flex justify-center bg-[#d4ee26] w-full '>
              {" "}
              <Image
                src='/welcome_mobile.png'
                width={300}
                height={400}
                alt='Picture of the author'
              />
            </div>
            <div className='text-left'>
              {" "}
              <h1>{t("stay_informed")}</h1>
              <p>{t("stay_informed_desc")}</p>
            </div>

            <button
              onClick={handleClick}
              className='bg-[#d4ee26] m-2 p-2 rounded text-black text-center w-full'
            >
              {t("subscribe")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navigation;
