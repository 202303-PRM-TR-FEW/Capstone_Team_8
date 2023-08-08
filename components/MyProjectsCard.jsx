import React, { useState } from "react";
import Image from "next/legacy/image";
import welcome from "@/public/welcome_mobile.png";
import ProgressBar from "./ProgressBar";
import ConfirmPopUp from "./ConfirmPopUp";
import EditProject from "./EditProject";
import TransactionHistory from "./TransactionHistory";
import { useTranslations } from "next-intl";

function MyProjectsCard({ project }) {
  const [isConfirmOpen, setIsConfirOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isTransactionHistoryOpen, setIsTransactionHistoryOpen] =
    useState(false);

  const handleOpenConfirmPopUp = () => {
    setIsConfirOpen(true);
  };

  const handleOpenEditPopUp = () => {
    setIsEditProjectOpen(true);
  };

  const handleOpenTransactionHistory = () => {
    setIsTransactionHistoryOpen(true);
  };
  const t = useTranslations();
  return (
    <>
      {isConfirmOpen && (
        <ConfirmPopUp
          isConfirmOpen={isConfirmOpen}
          setIsConfirmOpen={setIsConfirOpen}
          project={project}
        />
      )}
      {isEditProjectOpen && (
        <EditProject
          project={project}
          setIsEditProjectOpen={setIsEditProjectOpen}
        />
      )}
      {isTransactionHistoryOpen && (
        <TransactionHistory
          project={project}
          setIsTransactionHistoryOpen={setIsTransactionHistoryOpen}
        />
      )}
      <div key={project.id} className='block py-2 px-3 max-w-sm  '>
        <div
          key={project.id}
          className='flex flex-col shadow-lg  sm:gap-4 sm:p-6 gap-2 '
        >
          <div>
            <div className=' relative h-[30dvh] w-full '>
              <Image
                src={project?.img || welcome}
                layout='fill'
                className='rounded-xl drop-shadow-lg'
                alt='profile-picture'
              />{" "}
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex flex-col gap-2'>
                <h1>{project.title}</h1>
                <p className='min-h-[5rem]'>{project.about}</p>
                <ProgressBar project={project} />
              </div>
              <div className='flex justify-between items-center w-full gap-2 py-4'>
                <button
                  onClick={handleOpenEditPopUp}
                  className='flex justify-center items-center gap-2 w-full'
                >
                  {t("Edit")}
                  <svg viewBox='0 0 48 48' width='24px' height='24px'>
                    <path
                      fill='#E57373'
                      d='M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718C43.139,10.526,43.139,9.625,42.583,9.067'
                    />
                    <path
                      fill='#FF9800'
                      d='M4.465 21.524H40.471999999999994V29.535H4.465z'
                      transform='rotate(134.999 22.469 25.53)'
                    />
                    <path
                      fill='#B0BEC5'
                      d='M34.61 7.379H38.616V15.392H34.61z'
                      transform='rotate(-45.02 36.61 11.385)'
                    />
                    <path fill='#FFC107' d='M6.905 35.43L5 43 12.571 41.094z' />
                    <path fill='#37474F' d='M5.965 39.172L5 43 8.827 42.035z' />
                  </svg>
                </button>
                <button
                  className='flex w-full justify-center items-center gap-2'
                  onClick={handleOpenConfirmPopUp}
                >
                  {t("Delete")}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 128 128'
                    width='24px'
                    height='24px'
                    fill='#dc2726'
                  >
                    <path d='M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z' />
                  </svg>
                </button>
                <button
                  onClick={handleOpenTransactionHistory}
                  className='flex justify-center items-center w-full gap-2'
                >
                  {t("Transactions")}
                  <svg viewBox='0 0 80 80' width='24px' height='24px'>
                    <path d='M 10 14 L 10 20 L 7 20 L 7 26 L 5 26 L 5 66 L 75 66 L 75 26 L 73 26 L 73 20 L 71 20 L 71 14 Z M 12 16 L 69 16 L 69 20 L 12 20 Z M 9 22 L 71 22 L 71 26 L 9 26 Z M 7 28 L 73 28 L 73 64 L 7 64 Z M 16 30 C 15.449219 30 15 30.449219 15 31 C 15 31.550781 15.449219 32 16 32 C 16.550781 32 17 31.550781 17 31 C 17 30.449219 16.550781 30 16 30 Z M 19 30 C 18.449219 30 18 30.449219 18 31 C 18 31.550781 18.449219 32 19 32 C 19.550781 32 20 31.550781 20 31 C 20 30.449219 19.550781 30 19 30 Z M 22 30 C 21.449219 30 21 30.449219 21 31 C 21 31.550781 21.449219 32 22 32 C 22.550781 32 23 31.550781 23 31 C 23 30.449219 22.550781 30 22 30 Z M 25 30 C 24.449219 30 24 30.449219 24 31 C 24 31.550781 24.449219 32 25 32 C 25.550781 32 26 31.550781 26 31 C 26 30.449219 25.550781 30 25 30 Z M 28 30 C 27.449219 30 27 30.449219 27 31 C 27 31.550781 27.449219 32 28 32 C 28.550781 32 29 31.550781 29 31 C 29 30.449219 28.550781 30 28 30 Z M 31 30 C 30.449219 30 30 30.449219 30 31 C 30 31.550781 30.449219 32 31 32 C 31.550781 32 32 31.550781 32 31 C 32 30.449219 31.550781 30 31 30 Z M 34 30 C 33.449219 30 33 30.449219 33 31 C 33 31.550781 33.449219 32 34 32 C 34.550781 32 35 31.550781 35 31 C 35 30.449219 34.550781 30 34 30 Z M 37 30 C 36.449219 30 36 30.449219 36 31 C 36 31.550781 36.449219 32 37 32 C 37.550781 32 38 31.550781 38 31 C 38 30.449219 37.550781 30 37 30 Z M 40 30 C 39.449219 30 39 30.449219 39 31 C 39 31.550781 39.449219 32 40 32 C 40.550781 32 41 31.550781 41 31 C 41 30.449219 40.550781 30 40 30 Z M 43 30 C 42.449219 30 42 30.449219 42 31 C 42 31.550781 42.449219 32 43 32 C 43.550781 32 44 31.550781 44 31 C 44 30.449219 43.550781 30 43 30 Z M 46 30 C 45.449219 30 45 30.449219 45 31 C 45 31.550781 45.449219 32 46 32 C 46.550781 32 47 31.550781 47 31 C 47 30.449219 46.550781 30 46 30 Z M 49 30 C 48.449219 30 48 30.449219 48 31 C 48 31.550781 48.449219 32 49 32 C 49.550781 32 50 31.550781 50 31 C 50 30.449219 49.550781 30 49 30 Z M 52 30 C 51.449219 30 51 30.449219 51 31 C 51 31.550781 51.449219 32 52 32 C 52.550781 32 53 31.550781 53 31 C 53 30.449219 52.550781 30 52 30 Z M 55 30 C 54.449219 30 54 30.449219 54 31 C 54 31.550781 54.449219 32 55 32 C 55.550781 32 56 31.550781 56 31 C 56 30.449219 55.550781 30 55 30 Z M 58 30 C 57.449219 30 57 30.449219 57 31 C 57 31.550781 57.449219 32 58 32 C 58.550781 32 59 31.550781 59 31 C 59 30.449219 58.550781 30 58 30 Z M 61 30 C 60.449219 30 60 30.449219 60 31 C 60 31.550781 60.449219 32 61 32 C 61.550781 32 62 31.550781 62 31 C 62 30.449219 61.550781 30 61 30 Z M 64 30 C 63.449219 30 63 30.449219 63 31 C 63 31.550781 63.449219 32 64 32 C 64.550781 32 65 31.550781 65 31 C 65 30.449219 64.550781 30 64 30 Z M 15 33 C 14.449219 33 14 33.449219 14 34 C 14 34.550781 14.449219 35 15 35 C 15.550781 35 16 34.550781 16 34 C 16 33.449219 15.550781 33 15 33 Z M 65 33 C 64.449219 33 64 33.449219 64 34 C 64 34.550781 64.449219 35 65 35 C 65.550781 35 66 34.550781 66 34 C 66 33.449219 65.550781 33 65 33 Z M 13 35 C 12.449219 35 12 35.449219 12 36 C 12 36.550781 12.449219 37 13 37 C 13.550781 37 14 36.550781 14 36 C 14 35.449219 13.550781 35 13 35 Z M 40 35 C 33.9375 35 29 39.9375 29 46 C 29 52.0625 33.9375 57 40 57 C 46.0625 57 51 52.0625 51 46 C 51 39.9375 46.0625 35 40 35 Z M 67 35 C 66.449219 35 66 35.449219 66 36 C 66 36.550781 66.449219 37 67 37 C 67.550781 37 68 36.550781 68 36 C 68 35.449219 67.550781 35 67 35 Z M 10 36 C 9.449219 36 9 36.449219 9 37 C 9 37.550781 9.449219 38 10 38 C 10.550781 38 11 37.550781 11 37 C 11 36.449219 10.550781 36 10 36 Z M 70 36 C 69.449219 36 69 36.449219 69 37 C 69 37.550781 69.449219 38 70 38 C 70.550781 38 71 37.550781 71 37 C 71 36.449219 70.550781 36 70 36 Z M 40 37 C 44.980469 37 49 41.019531 49 46 C 49 50.980469 44.980469 55 40 55 C 35.019531 55 31 50.980469 31 46 C 31 41.019531 35.019531 37 40 37 Z M 10 39 C 9.449219 39 9 39.449219 9 40 C 9 40.550781 9.449219 41 10 41 C 10.550781 41 11 40.550781 11 40 C 11 39.449219 10.550781 39 10 39 Z M 70 39 C 69.449219 39 69 39.449219 69 40 C 69 40.550781 69.449219 41 70 41 C 70.550781 41 71 40.550781 71 40 C 71 39.449219 70.550781 39 70 39 Z M 10 42 C 9.449219 42 9 42.449219 9 43 C 9 43.550781 9.449219 44 10 44 C 10.550781 44 11 43.550781 11 43 C 11 42.449219 10.550781 42 10 42 Z M 19 42 C 16.800781 42 15 43.800781 15 46 C 15 48.199219 16.800781 50 19 50 C 21.199219 50 23 48.199219 23 46 C 23 43.800781 21.199219 42 19 42 Z M 60 42 C 57.800781 42 56 43.800781 56 46 C 56 48.199219 57.800781 50 60 50 C 62.199219 50 64 48.199219 64 46 C 64 43.800781 62.199219 42 60 42 Z M 70 42 C 69.449219 42 69 42.449219 69 43 C 69 43.550781 69.449219 44 70 44 C 70.550781 44 71 43.550781 71 43 C 71 42.449219 70.550781 42 70 42 Z M 19 44 C 20.117188 44 21 44.882813 21 46 C 21 47.117188 20.117188 48 19 48 C 17.882813 48 17 47.117188 17 46 C 17 44.882813 17.882813 44 19 44 Z M 60 44 C 61.117188 44 62 44.882813 62 46 C 62 47.117188 61.117188 48 60 48 C 58.882813 48 58 47.117188 58 46 C 58 44.882813 58.882813 44 60 44 Z M 10 45 C 9.449219 45 9 45.449219 9 46 C 9 46.550781 9.449219 47 10 47 C 10.550781 47 11 46.550781 11 46 C 11 45.449219 10.550781 45 10 45 Z M 70 45 C 69.449219 45 69 45.449219 69 46 C 69 46.550781 69.449219 47 70 47 C 70.550781 47 71 46.550781 71 46 C 71 45.449219 70.550781 45 70 45 Z M 10 48 C 9.449219 48 9 48.449219 9 49 C 9 49.550781 9.449219 50 10 50 C 10.550781 50 11 49.550781 11 49 C 11 48.449219 10.550781 48 10 48 Z M 70 48 C 69.449219 48 69 48.449219 69 49 C 69 49.550781 69.449219 50 70 50 C 70.550781 50 71 49.550781 71 49 C 71 48.449219 70.550781 48 70 48 Z M 10 51 C 9.449219 51 9 51.449219 9 52 C 9 52.550781 9.449219 53 10 53 C 10.550781 53 11 52.550781 11 52 C 11 51.449219 10.550781 51 10 51 Z M 70 51 C 69.449219 51 69 51.449219 69 52 C 69 52.550781 69.449219 53 70 53 C 70.550781 53 71 52.550781 71 52 C 71 51.449219 70.550781 51 70 51 Z M 10 54 C 9.449219 54 9 54.449219 9 55 C 9 55.550781 9.449219 56 10 56 C 10.550781 56 11 55.550781 11 55 C 11 54.449219 10.550781 54 10 54 Z M 70 54 C 69.449219 54 69 54.449219 69 55 C 69 55.550781 69.449219 56 70 56 C 70.550781 56 71 55.550781 71 55 C 71 54.449219 70.550781 54 70 54 Z M 13 55 C 12.449219 55 12 55.449219 12 56 C 12 56.550781 12.449219 57 13 57 C 13.550781 57 14 56.550781 14 56 C 14 55.449219 13.550781 55 13 55 Z M 67 55 C 66.449219 55 66 55.449219 66 56 C 66 56.550781 66.449219 57 67 57 C 67.550781 57 68 56.550781 68 56 C 68 55.449219 67.550781 55 67 55 Z M 15 57 C 14.449219 57 14 57.449219 14 58 C 14 58.550781 14.449219 59 15 59 C 15.550781 59 16 58.550781 16 58 C 16 57.449219 15.550781 57 15 57 Z M 65 57 C 64.449219 57 64 57.449219 64 58 C 64 58.550781 64.449219 59 65 59 C 65.550781 59 66 58.550781 66 58 C 66 57.449219 65.550781 57 65 57 Z M 16 60 C 15.449219 60 15 60.449219 15 61 C 15 61.550781 15.449219 62 16 62 C 16.550781 62 17 61.550781 17 61 C 17 60.449219 16.550781 60 16 60 Z M 19 60 C 18.449219 60 18 60.449219 18 61 C 18 61.550781 18.449219 62 19 62 C 19.550781 62 20 61.550781 20 61 C 20 60.449219 19.550781 60 19 60 Z M 22 60 C 21.449219 60 21 60.449219 21 61 C 21 61.550781 21.449219 62 22 62 C 22.550781 62 23 61.550781 23 61 C 23 60.449219 22.550781 60 22 60 Z M 25 60 C 24.449219 60 24 60.449219 24 61 C 24 61.550781 24.449219 62 25 62 C 25.550781 62 26 61.550781 26 61 C 26 60.449219 25.550781 60 25 60 Z M 28 60 C 27.449219 60 27 60.449219 27 61 C 27 61.550781 27.449219 62 28 62 C 28.550781 62 29 61.550781 29 61 C 29 60.449219 28.550781 60 28 60 Z M 31 60 C 30.449219 60 30 60.449219 30 61 C 30 61.550781 30.449219 62 31 62 C 31.550781 62 32 61.550781 32 61 C 32 60.449219 31.550781 60 31 60 Z M 34 60 C 33.449219 60 33 60.449219 33 61 C 33 61.550781 33.449219 62 34 62 C 34.550781 62 35 61.550781 35 61 C 35 60.449219 34.550781 60 34 60 Z M 37 60 C 36.449219 60 36 60.449219 36 61 C 36 61.550781 36.449219 62 37 62 C 37.550781 62 38 61.550781 38 61 C 38 60.449219 37.550781 60 37 60 Z M 40 60 C 39.449219 60 39 60.449219 39 61 C 39 61.550781 39.449219 62 40 62 C 40.550781 62 41 61.550781 41 61 C 41 60.449219 40.550781 60 40 60 Z M 43 60 C 42.449219 60 42 60.449219 42 61 C 42 61.550781 42.449219 62 43 62 C 43.550781 62 44 61.550781 44 61 C 44 60.449219 43.550781 60 43 60 Z M 46 60 C 45.449219 60 45 60.449219 45 61 C 45 61.550781 45.449219 62 46 62 C 46.550781 62 47 61.550781 47 61 C 47 60.449219 46.550781 60 46 60 Z M 49 60 C 48.449219 60 48 60.449219 48 61 C 48 61.550781 48.449219 62 49 62 C 49.550781 62 50 61.550781 50 61 C 50 60.449219 49.550781 60 49 60 Z M 52 60 C 51.449219 60 51 60.449219 51 61 C 51 61.550781 51.449219 62 52 62 C 52.550781 62 53 61.550781 53 61 C 53 60.449219 52.550781 60 52 60 Z M 55 60 C 54.449219 60 54 60.449219 54 61 C 54 61.550781 54.449219 62 55 62 C 55.550781 62 56 61.550781 56 61 C 56 60.449219 55.550781 60 55 60 Z M 58 60 C 57.449219 60 57 60.449219 57 61 C 57 61.550781 57.449219 62 58 62 C 58.550781 62 59 61.550781 59 61 C 59 60.449219 58.550781 60 58 60 Z M 61 60 C 60.449219 60 60 60.449219 60 61 C 60 61.550781 60.449219 62 61 62 C 61.550781 62 62 61.550781 62 61 C 62 60.449219 61.550781 60 61 60 Z M 64 60 C 63.449219 60 63 60.449219 63 61 C 63 61.550781 63.449219 62 64 62 C 64.550781 62 65 61.550781 65 61 C 65 60.449219 64.550781 60 64 60 Z' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProjectsCard;
