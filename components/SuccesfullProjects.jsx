import React, { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next-intl/client';
import Link from 'next-intl/link';

function SuccesfullProjects() {
	const locale = useLocale();
	const [filteredData, setFilteredData] = useState([]);
	const router = useRouter();
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
			const filterSuccess = dataArr.filter(
				(item) => item.totalDonations === item.goal
			);
			setFilteredData(filterSuccess);
		});
		return () => unsubscribe();
	}, []);
	const handleClick = () => {
		router.push('/success', { locale: locale });
	};

	return (
		<div>
			{' '}
			<div className='grid grid-cols-12 gap-6 border-b-2 pb-12 '>
				<div className='w-full flex flex-col justify-center gap-12 md:pt-0 sm:col-span-7 col-span-12  '>
					<h1 className='lg:text-6xl text-4xl sm:text-5xl font-bold'>
						{t('Most Successful Project')}
					</h1>
					<div className='w-full'>
						{' '}
						<Link
							key={filteredData[0]?.id}
							className='block py-2 px-3'
							href={`/project/${filteredData[0]?.id}`}
							locale={locale}
						>
							<div className='relative md:h-[35dvh] lg:h-[40dvh] xl:h-[45dvh] 2xl:h-[50dvh] h-[30svh] w-full'>
								<Image
									src={filteredData[0]?.img}
									layout='fill'
									className='rounded-xl drop-shadow-lg'
									objectFit='cover'
									alt='Picture of the author'
								/>
							</div>
						</Link>
					</div>
				</div>
				<div className='w-full flex flex-col gap-4 sm:col-span-5 col-span-12  justify-end  '>
					<h3 className='font-bold lg:text-4xl md:text-3xl text-2xl '>
						{filteredData[0]?.title}
					</h3>

					<div className=' w-full flex flex-col gap-2 text-sm'>
						<div className='h-2 w-full bg-gray-200 rounded'>
							<div
								style={{
									maxWidth: '100%',
									width: `${
										(filteredData[0]?.totalDonations / filteredData[0]?.goal) *
										100
									}%`,
								}}
								className='h-2  bg-[#d4ee26] rounded'
							></div>
						</div>

						<div className='grid grid-cols-12 justify-end'>
							<span className='col-span-10'>{t('Raised')}</span>{' '}
							<span className='col-span-2 justify-self-end'>{t('Goal')}</span>
						</div>

						<div className='grid grid-cols-12'>
							<span className='col-span-10'>
								<span className='font-bold text-lg '>$ </span>
								{filteredData[0]?.totalDonations}
							</span>{' '}
							<span className='col-span-2 justify-self-end'>
								<span className='font-bold  text-base sm:text-lg '>$</span>{' '}
								{filteredData[0]?.goal}
							</span>
						</div>
					</div>
					<div className='  py-3  flex w-full justify-center '>
						<button
							onClick={handleClick}
							className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-black text-xl font-medium text-white  focus:outline-none sm:ml-3  '
						>
							{t('See More Projects')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SuccesfullProjects;
