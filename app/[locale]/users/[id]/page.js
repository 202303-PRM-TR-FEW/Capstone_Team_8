'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db, fetchDocByUserId, auth } from '@/firebase/firebase';
import UserProfileTabs from '@/components/UserProfileTabs';

function Users({ params }) {
	const id = params.id;
	const userId = auth.currentUser?.uid;
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [user, setUser] = useState([]);
	const [userDonatedProjects, setUserDonatedProjects] = useState([]);
	const t = useTranslations();
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
		filterDonatedProjectsByUserId();
	}, [data]);

	const filterProjectByUserId = () => {
		const filteredProjects = data?.filter((item) => item.userId === id);

		setFilteredData(filteredProjects);
		return filteredData;
	};

	const filterDonatedProjectsByUserId = () => {
		const userDonatedProjects = data.filter((item) =>
			item.donations.some((donation) => donation.user.uid === id)
		);
		setUserDonatedProjects(userDonatedProjects);
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const userId = id;
				if (userId) {
					const userDoc = await fetchDocByUserId(userId);
					setUser(userDoc);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<>
			<div className='flex  flex-col  w-full min-h-screen sm:pt-24 pt-12 px-4 pb-20 '>
				<UserProfileTabs
					user={user}
					filteredData={filteredData}
					userDonatedProjects={userDonatedProjects}
				></UserProfileTabs>
			</div>
		</>
	);
}

export default Users;
