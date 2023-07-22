"use client";
import React from "react";
import PageLayout from "@/components/PageLayout";

import ProjectCard from "@/components/ProjectCard";
import { useSelector } from "react-redux";

function Search() {
  const data = useSelector((state) => state.searchProject.searchResult);
  return (
    <PageLayout>
      <div className='flex flex-col overflow-auto h-[100vh]  pt-24 pb-20   w-full'>
        <h1 className='font-bold text-2xl pl-4 pb-4'>Search Results</h1>
        {data.length < 1 && (
          <div
            id='noData'
            className='flex flex-col w-full h-full justify-end items-center gap-4 p-6'
          >
            <p className='font-bold sm:text-3xl text-xl text-black '>
              Our robot could not find what you were looking for. Please give
              our robot more easy terms.
            </p>
          </div>
        )}
        <div className='flex flex-wrap'>
          {data.map((item) => (
            <ProjectCard project={item} key={item.id}></ProjectCard>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Search;
