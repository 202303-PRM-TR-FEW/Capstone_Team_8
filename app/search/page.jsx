"use client";
import React from "react";
import PageLayout from "@/components/PageLayout";

import ProjectCard from "@/components/ProjectCard";
import { useSelector } from "react-redux";

function Search() {
  const data = useSelector((state) => state.searchProject.searchResult);
  return (
    <PageLayout>
      <div className=" h-full overflow-auto flex flex-col   md:px-12 px-6 py-24  w-full">
        {data.length < 1 && (
          <div>
            Our robot could not find what you were looking for. Please give our
            robot more easy terms.
          </div>
        )}
        <div className="flex flex-wrap">
          {data.map((item) => (
            <ProjectCard project={item} key={item.id}></ProjectCard>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Search;
