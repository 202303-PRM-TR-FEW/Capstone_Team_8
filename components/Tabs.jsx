import React, { useState } from "react";
import ProjectOfTheWeek from "./ProjectOfTheWeek";
import SuccesfullProjects from "./SuccesfullProjects";
import TopDonors from "./TopDonors";
import { useTranslations } from "next-intl";
function Tabs({ data, ongoingProjects }) {
  const [activeTab, setActiveTab] = useState("Project Of The Week");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const t = useTranslations();
  return (
    <>
      <div className='mb-4 border-b border-gray-200 '>
        <ul
          className='flex flex-wrap -mb-px text-sm font-medium text-center'
          id='myTab'
          data-tabs-toggle='#myTabContent'
          role='tablist'
        >
          <li className='mr-2' role='presentation'>
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "Project Of The Week"
                  ? "border-indigo-500"
                  : "border-transparent"
              }`}
              id='Project Of The Week-tab'
              data-tabs-target='#Project Of The Week'
              type='button'
              role='tab'
              aria-controls='Project Of The Week'
              aria-selected={activeTab === "Project Of The Week"}
              onClick={() => handleTabClick("Project Of The Week")}
            >
              {t("Project Of The Week")}
            </button>
          </li>
          <li className='mr-2' role='presentation'>
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300  ${
                activeTab === "Successful Projects"
                  ? "border-indigo-500"
                  : "border-transparent"
              }`}
              id='Successful Projects-tab'
              data-tabs-target='#Successful Projects'
              type='button'
              role='tab'
              aria-controls='Successful Projects'
              aria-selected={activeTab === "Successful Projects"}
              onClick={() => handleTabClick("Successful Projects")}
            >
              {t("Successful Projects")}
            </button>
          </li>
          <li className='mr-2' role='presentation'>
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300  ${
                activeTab === "Top Donors"
                  ? "border-indigo-500"
                  : "border-transparent"
              }`}
              id='Top Donors-tab'
              data-tabs-target='#Top Donors'
              type='button'
              role='tab'
              aria-controls='Top Donors'
              aria-selected={activeTab === "Top Donors"}
              onClick={() => handleTabClick("Top Donors")}
            >
              {t("Top Donors")}
            </button>
          </li>
        </ul>
      </div>
      <div id='myTabContent'>
        <div
          className={`p-4 rounded-lg bg-gray-50  ${
            activeTab === "Project Of The Week" ? "block" : "hidden"
          }`}
          id='Project Of The Week'
          role='tabpanel'
          aria-labelledby='Project Of The Week-tab'
        >
          <ProjectOfTheWeek data={ongoingProjects} />
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50  ${
            activeTab === "Successful Projects" ? "block" : "hidden"
          }`}
          id='Successful Projects'
          role='tabpanel'
          aria-labelledby='Successful Projects-tab'
        >
          <SuccesfullProjects />
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 ${
            activeTab === "Top Donors" ? "block" : "hidden"
          }`}
          id='Top Donors'
          role='tabpanel'
          aria-labelledby='Top Donors-tab'
        >
          <TopDonors data={data} />
        </div>
      </div>
    </>
  );
}

export default Tabs;
