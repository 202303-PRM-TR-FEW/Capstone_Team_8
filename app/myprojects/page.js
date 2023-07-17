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
import MyProjectsCard from '@/components/MyProjectsCard';

function MyProject(props) {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);
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
			<div className='w-full overflow-auto flex   pt-24 pb-20 '>
				<div className='flex flex-wrap justify-center items-center px-4 gap-4'>
					{filteredData.map((project) => {
						return (
							<div key={project.id} className=' flex justify-center'>
								<MyProjectsCard project={project}></MyProjectsCard>
							</div>
						);
					})}
				</div>
			</div>
		</PageLayout>
	);
}

export default WithAuth(MyProject);
