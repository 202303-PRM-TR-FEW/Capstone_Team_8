import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { query, onSnapshot, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchResults } from '@/app/features/searchproject/searchproject';
import moment from 'moment';

export default function SearchBar({ setIsSeachBarOpen }) {
	const [text, setText] = useState('');
	const [data, setData] = useState([]);

	const router = useRouter();
	const dispatch = useDispatch();
	const searchText = (e) => {
		e.preventDefault();
		setIsSeachBarOpen(false);
		filterDataBySearchQuery();
		router.push('/search');
		setText('');
	};
	useEffect(() => {
		const q = query(collection(db, 'app'));
		onSnapshot(q, (querySnapshot) => {
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
			return dataArr;
		});
	}, []);
	const filterDataBySearchQuery = () => {
		const filteredResults = data.filter((item) =>
			item.title.toLowerCase().includes(text.toLowerCase())
		);

		filteredResults.forEach((item) => {
			item.endTime = item.endTime.seconds;
			item.startTime = item.startTime.seconds;
		});
		setSearchResults(filteredResults);
		dispatch(setSearchResults(filteredResults));
	};
	const handleText = (e) => {
		setText(e.target.value);
	};
	return (
		<form onSubmit={searchText}>
			<input
				type='text'
				value={text}
				onChange={handleText}
				id='search-navbar'
				className='block lg:w-72 relative w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
				placeholder='Search...'
			/>
			<button
				type='submit'
				className='absolute inset-y-0 top-0 right-5 flex items-center pl-3 '
			>
				<svg
					className='w-5 h-5 cursor-pointer  text-gray-700 hover:scale-105'
					aria-hidden='true'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fillRule='evenodd'
						d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
						clipRule='evenodd'
					></path>
				</svg>
			</button>
		</form>
	);
}
