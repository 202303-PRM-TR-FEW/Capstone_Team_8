"use client";
import React, { useEffect, useState, useRef } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Image from "next/legacy/image";
import { useTranslations, useLocale } from "next-intl";
import Link from "next-intl/link";

function TransactionHistory({ setIsTransactionHistoryOpen, project }) {
  const ref = useRef(null);
  const locale = useLocale();
  const t = useTranslations();
  const handleCloseModal = () => {
    setIsTransactionHistoryOpen(false);
  };
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let dataArr = [];
      querySnapshot.forEach((doc) => {
        const projectData = { ...doc.data(), id: doc.id };
        dataArr.push({ ...projectData });
      });

      const filterDonators = dataArr
        .map((item) => {
          let totalDonation = project.donations.reduce((total, donation) => {
            if (donation.user.uid === item.uid) {
              return total + donation.donation;
            }
            return total;
          }, 0);

          if (totalDonation > 0) {
            item.totalDonation = totalDonation;
            return item;
          }

          return null;
        })
        .filter(Boolean);
      filterDonators.sort((a, b) => b.totalDonation - a.totalDonation);
      setFilteredData(filterDonators);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleCloseModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className='fixed top-0 left-0 z-10 inset-0 overflow-y-auto w-full pt-16'>
      <div className='flex items-center justify-center min-h-screen overflow-auto pt-4 px-4 pb-20 text-center'>
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          aria-hidden='true'
        ></div>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>
        <div className='inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div ref={ref} className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='flex flex-col gap-12 '>
              <h1>{t("transaction_history")} </h1>
              <div className='flex flex-col gap-2 rounded'>
                {filteredData?.map((item, index) => {
                  return (
                    <div
                      className='flex flex-row justify-between gap-2 items-center rounded p-2 bg-gray-200 '
                      key={item.id}
                    >
                      <div className='flex gap-4 items-center'>
                        {" "}
                        <span>{index + 1}</span>
                        <Image
                          width={40}
                          height={40}
                          className='rounded'
                          alt='user image'
                          src={item?.photoURL}
                        />
                        <Link
                          href={{
                            pathname: `/users/${item?.uid}`,
                          }}
                          locale={locale}
                        >
                          <p>{item?.displayName}</p>
                        </Link>
                      </div>
                      <div className='flex gap-4'>
                        {" "}
                        <p>{item?.totalDonation}$</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='flex justify-center items-center'>
                <button
                  onClick={handleCloseModal}
                  className=' rounded m-2 p-2 bg-transparent text-black'
                >
                  {" "}
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
