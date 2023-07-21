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
function Home() {
	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

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
			dataArr.sort((a, b) => b.totalDonations - a.totalDonations);
			setData(dataArr);
			setFilteredData(dataArr);
		});
		return () => unsubscribe();
	}, []);

	return (
		<>
			<PageLayout>
				{kickOffModalStatus && <KickOffProject />}
				<main className='flex  flex-col   justify-center   h-full overflow-auto   md:px-12 px-6 py-24  w-full '>
					<div className='grid grid-cols-12 gap-6 border-b-2 pb-12 '>
						<div className='w-full flex flex-col justify-center gap-12 md:pt-0 sm:col-span-7 col-span-12  '>
							<h1 className='text-6xl font-bold'>Project of the week</h1>
							<div className='w-full'>
								{' '}
								<Link
									key={data[0]?.id}
									className='block py-2 px-3 lg:w-2/4'
									href={`/project/${data[0]?.id}`}
								>
									<Image
										className='border-2 '
										src={data[0]?.img}
										layout='responsive'
										width={300}
										height={200}
										alt='Picture of the author'
									/>
								</Link>
							</div>
						</div>
						<div className='w-full flex flex-col gap-4 sm:col-span-5 col-span-12  justify-end  '>
							<h3 className='font-bold lg:text-4xl md:text-3xl text-2xl '>
								{data[0]?.title}
							</h3>
							<p className='text-sm'>{data[0]?.desc}</p>

							<div className=' w-full flex flex-col gap-2 text-sm'>
								<div className='h-2 w-full bg-gray-200 rounded'>
									<div
										style={{
											maxWidth: '100%',
											width: `${
												(data[0]?.totalDonations / data[0]?.goal) * 100
											}%`,
										}}
										className='h-2  bg-[#d4ee26] rounded'
									></div>
								</div>

								<div className='grid grid-cols-12'>
									<span className='col-span-11'>Raised</span>{' '}
									<span className='col-span-1'>Goal:</span>
								</div>

								<div className='grid grid-cols-12'>
									<span className='col-span-11'>
										${data[0]?.totalDonations}
									</span>{' '}
									<span className='col-span-1'>${data[0]?.goal}</span>
								</div>
							</div>
						</div>
					</div>

					<div className='my-6 flex flex-col justify-center items-center w-full '>
						<h1 className='text-5xl text-left font-bold'>Categories</h1>
						<div className='justify-center items-center'>
							<ul className='flex gap-4 my-6 '>
								{
									<FilterCategories
										data={data}
										selectedCategory={selectedCategory}
										setSelectedCategory={setSelectedCategory}
										setFilteredData={setFilteredData}
									/>
								}
							</ul>
						</div>
					</div>
					<div className='flex justify-center items-center w-full'>
						<div className='flex flex-wrap w-full gap-4 '>
							{filteredData.map((project) => {
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
