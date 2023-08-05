'use client';
import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';

function Search() {
	const data = useSelector((state) => state.searchProject.searchResult);
	const t = useTranslations();
	return (
		<>
			<div className='flex flex-col overflow-auto   pt-24 pb-20   w-full'>
				<h1 className='font-bold text-2xl pl-4 pb-4'>{t('search_results')} </h1>
				{data.length < 1 && (
					<div
						id='noData'
						className='flex flex-col w-full h-full justify-end items-center gap-4 p-6'
					>
						<p className='font-bold sm:text-3xl text-xl text-black '>
							{t('no_results')}
						</p>
					</div>
				)}
				<div className='flex flex-wrap'>
					{data.map((item) => (
						<ProjectCard project={item} key={item.id}></ProjectCard>
					))}
				</div>
			</div>
		</>
	);
}

export default Search;
