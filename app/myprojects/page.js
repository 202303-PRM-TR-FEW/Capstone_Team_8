'use client';
import React, { useEffect, useState } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { getAuth } from '@firebase/auth';
import PageLayout from '@/components/PageLayout';
import { useSelector } from 'react-redux';
import KickOffProject from '@/components/KickOffProject';
import WithAuth from '@/components/AuthanticatedRoute';
import Loading from '@/app/loading';

function MyProject(props) {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [isOpen1, setIsOpen1] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);

	const toggleAccordion1 = () => {
		setIsOpen1(!isOpen1);
		setIsOpen2(false);
	};

	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);

	const toggleAccordion2 = () => {
		setIsOpen2(!isOpen2);
		setIsOpen1(false);
	};
	const auth = getAuth();

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
			<section className='flex flex-col justify-center h-full md:px-12 px-6 py-24 w-full'>
				{filteredData && filteredData?.length > 0 ? (
					<div className='grid grid-cols-12 gap-8 justify-center items-center w-full'>
						<div className='w-full h-full lg:col-span-4 flex flex-col col-span-12'>
							<div>
								<h1>{filteredData[0]?.title} </h1>
							</div>
							<div>
								<img src={filteredData[0]?.img} />
							</div>
							<div>
								<p>{filteredData[0]?.desc} </p>
							</div>
							<div className='flex flex-col self-center justify-self-center'>
								<div className='grid grid-cols-12'>
									<span className='col-span-11'>Raised</span>{' '}
									<span className='col-span-1'>Goal:</span>
								</div>
								<div className='h-2 w-full bg-gray-200 rounded'>
									<div
										style={{
											width: `${
												(filteredData[0]?.totalDonations /
													filteredData[0]?.goal) *
												100
											}%`,
										}}
										className='h-2 bg-[#d4ee26] rounded'
									></div>
								</div>
								<div className='grid grid-cols-12'>
									<span className='col-span-11'>
										${filteredData[0]?.totalDonations}
									</span>{' '}
									<span className='col-span-1'>${filteredData[0]?.goal}</span>
								</div>
							</div>
						</div>
						<div className='flex flex-col content-around lg:col-span-8 col-span-12 gap-2 sm:gap-4 md:gap-10'>
							<div className='border border-gray-300 rounded-lg mb-4'>
								<button
									onClick={toggleAccordion1}
									className='flex justify-between items-center bg-gray-200 px-4 py-2 w-full'
								>
									<span className='font-medium'>Transaction History</span>
									<svg
										className={`w-4 h-4 transition-transform transform ${
											isOpen1 ? 'rotate-180' : ''
										}`}
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path
											fillRule='evenodd'
											d='M6.707 7.293a1 1 0 010 1.414L3.414 12l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414zm6 0a1 1 0 010 1.414L9.414 12l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414z'
											clipRule='evenodd'
										/>
									</svg>
								</button>
								{isOpen1 && (
									<div className='bg-white px-4 py-2'>
										{filteredData?.map((project) => {
											return project.donations.map((donation, index) => {
												return <div key={index}>{donation.user.uid}</div>;
											});
										})}
									</div>
								)}
							</div>
							<div className='border border-gray-300 rounded-lg mb-4'>
								<button
									onClick={toggleAccordion2}
									className='flex justify-between items-center bg-gray-200 px-4 py-2 w-full'
								>
									<span className='font-medium'>Accordion Item 2</span>
									<svg
										className={`w-4 h-4 transition-transform transform ${
											isOpen2 ? 'rotate-180' : ''
										}`}
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path
											fillRule='evenodd'
											d='M6.707 7.293a1 1 0 010 1.414L3.414 12l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414zm6 0a1 1 0 010 1.414L9.414 12l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414z'
											clipRule='evenodd'
										/>
									</svg>
								</button>
								{isOpen2 && (
									<div className='bg-white px-4 py-2'>
										<p>Content for Accordion Item 2</p>
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<div>No project available</div>
				)}
			</section>
		</PageLayout>
	);
}

export default WithAuth(MyProject);
