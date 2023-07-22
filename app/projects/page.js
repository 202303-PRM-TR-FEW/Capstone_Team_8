'use client';
import Image from 'next/legacy/image';
import KickOffProject from '@/components/KickOffProject';
import PageLayout from '@/components/PageLayout';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import Loading from '@/app/loading';
import ProjectCard from '@/components/ProjectCard';
import FilterCategories from '@/components/FilterCategories';
import Tabs from '@/components/Tabs';
function Home() {
	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [ongoingProjects, setOngoingProjects] = useState([]);

	useEffect(() => {
		const q = query(collection(db, 'app'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let dataArr = [];
			querySnapshot.forEach((doc) => {
				const projectData = { ...doc.data(), id: doc.id };
				const totalDonations = projectData.donations.reduce(
					(total, donation) => total + parseInt(donation.donation),
					0
				);
				dataArr.push({ ...projectData, totalDonations });
			});
			const ongoingProjects = dataArr.filter(
				(project) => project.totalDonations != project.goal
			);
			ongoingProjects.sort((a, b) => b.totalDonations - a.totalDonations);
			setOngoingProjects(ongoingProjects);
			setFilteredData(ongoingProjects);
			dataArr.sort((a, b) => b.totalDonations - a.totalDonations);
			setData(dataArr);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	return (
		<>
			<PageLayout>
				{loading && <Loading />}
				{kickOffModalStatus && <KickOffProject />}
				<main className='flex  flex-col   justify-center   h-full overflow-auto   sm:px-4 px-2 py-24  w-full '>
					<Tabs data={data} ongoingProjects={ongoingProjects} />

					<div className='my-6 flex flex-col justify-center items-center w-full '>
						<h1 className='lg:text-5xl text-3xl sm:text-4xl text-left font-bold'>
							Categories
						</h1>
						<div className='justify-center items-center'>
							<ul className='flex gap-4 my-6 '>
								{
									<FilterCategories
										data={ongoingProjects}
										selectedCategory={selectedCategory}
										setSelectedCategory={setSelectedCategory}
										setFilteredData={setFilteredData}
									/>
								}
							</ul>
						</div>
					</div>
					<div className='flex justify-center items-center w-full'>
						<div className='flex flex-col  lg:flex-row  lg:flex-wrap  w-full gap-4 lg:justify-start justify-center items-center '>
							{filteredData?.map((project) => {
								return (
									<ProjectCard project={project} key={project.id}></ProjectCard>
								);
							})}
						</div>
					</div>
				</main>
			</PageLayout>
		</>
	);
}
export default Home;
