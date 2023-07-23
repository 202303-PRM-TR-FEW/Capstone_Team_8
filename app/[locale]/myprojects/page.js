'use client';
import React, { useEffect, useState } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { getAuth } from '@firebase/auth';
import PageLayout from '@/components/PageLayout';
import { useSelector, useDispatch } from 'react-redux';
import KickOffProject from '@/components/KickOffProject';
import WithAuth from '@/components/AuthanticatedRoute';
import Loading from '@/app/[locale]/loading';
import MyProjectsCard from '@/components/MyProjectsCard';
import Link from 'next/link';
import { openAddProject } from '../features/startproject/kickoff';

function MyProject(props) {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);
	const auth = getAuth();
	const dispatch = useDispatch();

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
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		filterProjectByUserId();
	}, [data]);

	const filterProjectByUserId = () => {
		const filteredProjects =
			data && data?.length > 0
				? data?.filter((item) => item.userId === auth?.currentUser?.uid)
				: [];
		setFilteredData(filteredProjects);
		return filteredData;
	};
	if (props.loading || !props.user)
		return (
			<div>
				<Loading></Loading>
			</div>
		);

	return (
		<PageLayout>
			{kickOffModalStatus && <KickOffProject />}
			<div className='flex  flex-col  w-full overflow-auto h-[100vh] pt-12 pb-20 '>
				{filteredData.length < 1 ? (
					<div
						id='noData'
						className='flex flex-col w-full h-full justify-end items-center gap-4 p-6'
					>
						<div>
							<p className='font-bold text-3xl text-black '>
								It seems you have not started any project!
							</p>
						</div>

						<div className='flex gap-4 justify-center items-center'>
							<button
								onClick={() => {
									dispatch(openAddProject());
								}}
							>
								<Link
									className='block py-2 pl-3 pr-4 bg-gray-900 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]  '
									href='/projects'
								>
									New project
								</Link>
							</button>
						</div>
					</div>
				) : (
					<>
						<div className='flex flex-col sm:justify-start sm:items-start justify-center items-center gap-4 p-6'>
							<div>
								<h1 className='font-bold text-3xl'>Your Projects</h1>
							</div>
							<div>
								<p>
									Here you can edit, delete or see the transaction history of
									your projects
								</p>
							</div>
						</div>
						<div className='flex flex-wrap justify-start items-start w-full px-4 gap-4'>
							{filteredData.map((project) => {
								return (
									<div key={project.id} className=' flex justify-center  '>
										<MyProjectsCard project={project}></MyProjectsCard>
									</div>
								);
							})}
						</div>
					</>
				)}
			</div>
		</PageLayout>
	);
}

export default WithAuth(MyProject);
