import React, { useState } from "react";
import Image from "next/legacy/image";
import welcome from "@/public/welcome_mobile.png";
import ProgressBar from "./ProgressBar";
import ConfirmPopUp from "./ConfirmPopUp";
import EditProject from "./EditProject";
import TransactionHistory from "./TransactionHistory";

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
      <div key={project.id} className="block py-2 px-3  ">
        <div key={project.id} className="flex flex-col shadow-lg  gap-4 p-6 ">
          <div className=" justify-items-center gap-4  ">
            <div className=" relative w-full sm:w-96 h-64    ">
              <Image
                src={project?.img || welcome}
                layout="fill"
                alt="profile-picture"
              />{" "}
            </div>
            <div className="flex flex-col w-full sm:w-96 ">
              <div className="flex flex-col gap-2">
                <h1>{project.title}</h1>
                <p>{project.desc}</p>
                <p className="min-h-[5rem]">{project.about}</p>
                <ProgressBar project={project} />
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleOpenEditPopUp}
                  className="m-2 p-2 bg-blue-400"
                >
                  Edit
                </button>
                <button
                  className="m-2 p-2 bg-red-400"
                  onClick={handleOpenConfirmPopUp}
                >
                  Delete
                </button>
                <button
                  onClick={handleOpenTransactionHistory}
                  className="m-2 p-2 bg-gray-200"
                >
                  Show Transaction History
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
