'use client';
import React from 'react';
import PageLayout from '@/components/PageLayout';
import WithAuth from '@/components/AuthanticatedRoute';
import ProjectCard from '@/components/ProjectCard';
import { useSelector } from 'react-redux';
import Loading from '@/app/loading';

function Search(props) {
	const data = useSelector((state) => state.searchProject.searchResult);

	if (props.loading || !props?.user)
		return (
			<div>
				<Loading></Loading>
			</div>
		);

	return (
		<PageLayout>
			<div className=' h-full overflow-auto flex flex-col   md:px-12 px-6 py-24  w-full'>
				<h1>This is the search page</h1>
				<div className='flex flex-wrap'>
					{data.map((item) => (
						<ProjectCard
							project={item}
							key={item.id}
							props={props}
						></ProjectCard>
					))}
				</div>
			</div>
		</PageLayout>
	);
}

export default WithAuth(Search);
