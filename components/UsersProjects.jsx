import React from "react";
import Image from "next/legacy/image";
import Follow from "./Follow";
import ProjectCard from "./ProjectCard";
import { useTranslations } from "next-intl";

function UsersProjects({ user, filteredData }) {
  const t = useTranslations();
  return (
    <div>
      <div>
        <div className='flex items-center justify-start gap-2 pt-8 '>
          <div className='relative h-[5svh] w-[5svh] '>
            <Image
              src={user[0]?.photoURL}
              layout='fill'
              className='rounded-xl drop-shadow-lg'
              objectFit='cover'
              alt='Picture of the author'
            />
          </div>
          <div>
            <h1>
              {user[0]?.displayName} {t("user_projects")} :
            </h1>
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-center items-center'>
              <Follow userDetail={user[0]}></Follow>
            </div>
          </div>
        </div>
        {filteredData?.length > 0 ? (
          <div className='flex flex-col  lg:flex-row  lg:flex-wrap  w-full gap-4 lg:justify-start justify-center items-center '>
            {filteredData?.map((project) => {
              return (
                <ProjectCard project={project} key={project.id}></ProjectCard>
              );
            })}
          </div>
        ) : (
          <div
            id='noData'
            className='flex  w-full h-[50vh] gap-4 pt-6 justify-center items-end '
          >
            <h1 className='text-2xl font-bold text-center'>
              {t("no_projects")}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersProjects;
