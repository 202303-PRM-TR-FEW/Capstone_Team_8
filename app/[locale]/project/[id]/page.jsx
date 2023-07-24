'use client';
import React, { useState, useEffect } from 'react';
import { fetchDocById, fetchDocByUserId } from '../../../../firebase/firebase';
import PageLayout from '@/components/PageLayout';
import FundProject from '@/components/FundProject';
import moment from 'moment';
import Loading from '@/app/[locale]/loading';
import { auth } from '@/firebase/firebase';
import Image from 'next/legacy/image';
import Comments from '@/components/Comments';
import Comment from '@/components/Comment';
import SocialSharing from '@/components/SocialSharing';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db, updateFollow } from '@/firebase/firebase';
import ProjectCard from '@/components/ProjectCard';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next-intl/client';
import Link from 'next-intl/link';
function ProjectDetail({ params }) {
	const router = useRouter();
	const locale = useLocale();
	const [isOpen, setIsOpen] = useState(false);
	const [projectDetailInfo, setProjectDetail] = useState({});
	const [userDetail, setUserDetail] = useState({});
	const [totalAmount, setTotalAmount] = useState(0);
	const [progress, setProgress] = useState(0);
	const [dayLeft, setDayLeft] = useState(0);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [follow, setFollow] = useState(false);
	const t = useTranslations();
	const fetchAllData = async () => {
		if (params && params?.id) {
			setLoading(true);
			const projectDetail = await fetchDocById(params?.id);
			setProjectDetail((prevState) => ({ ...prevState, ...projectDetail }));
			const userDetail = await fetchDocByUserId(projectDetail?.userId);
			setUserDetail((prevState) => ({ ...prevState, ...userDetail }));
			const totalAmount = projectDetail.donations.reduce((total, donation) => {
				return total + parseFloat(donation.donation);
			}, 0);
			setTotalAmount((prevState) =>
				prevState !== totalAmount ? totalAmount : prevState
			);
			const progress = (totalAmount / projectDetail?.goal) * 100;
			setProgress((prevState) =>
				prevState !== progress ? progress : prevState
			);
			const endTime = moment.unix(projectDetail?.endTime?.seconds);
			const now = moment();
			const dayLeft = endTime.diff(now, 'days');
			setDayLeft((prevState) => (prevState !== dayLeft ? dayLeft : prevState));

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
				const filteredData = dataArr.filter(
					(project) =>
						project.category === projectDetail.category &&
						project.id !== params.id
				);
				setData((prevState) =>
					prevState !== filteredData ? filteredData : prevState
				);
			});
			setLoading(false);
			return () => unsubscribe();
		}
	};
	useEffect(() => {
		fetchAllData();
	}, [params?.id]);

	const handleClick = () => {
		setIsOpen(true);
	};

	const handleLogin = () => {
		router.push('/login', { locale: locale });
	};
	const handleFollow = () => {
		if (auth.currentUser) {
			setFollow((prevState) => !prevState);
		}
	};

	useEffect(() => {
		if (auth.currentUser) {
			updateFollow(userDetail[0]?.uid, follow);
		}
	}, [follow]);

	return (
		<>
			<PageLayout>
				{loading && <Loading />}
				{isOpen && (
					<FundProject
						setIsOpen={setIsOpen}
						projectId={params?.id}
						totalAmount={totalAmount}
						projectDetail={projectDetailInfo}
					/>
				)}
				<section className='flex  flex-col   justify-center   h-full    md:px-12 px-6 py-24  w-full '>
					<div className='grid grid-cols-12 gap-6  justify-center items-center w-full pb-16'>
						<div className='relative sm:h-[40dvh] col-span-12 lg:col-span-4 h-[40svh] w-full'>
							<Image
								src={projectDetailInfo?.img}
								layout='fill'
								className='rounded-xl drop-shadow-lg'
								objectFit='cover'
								alt='Picture of the author'
							/>
						</div>

						<div className='flex flex-col  content-around lg:col-span-8 col-span-12 gap-2 sm:gap-4 md:gap-6'>
							<div className='p-2  lg:p-6  flex flex-col gap-4 lg:gap-8'>
								<h1 className='font-bold sm:text-3xl text-xl '>
									{projectDetailInfo?.title}
								</h1>
								<div className='flex items-center gap-2'>
									<Image
										width={40}
										height={40}
										className='rounded-full'
										alt='user image'
										src={userDetail[0]?.photoURL}
									/>
									<Link
										href={{
											pathname: `/users/${userDetail[0]?.uid}`,
										}}
										locale={locale}
									>
										<p>{userDetail[0]?.displayName} </p>
									</Link>
									<button
										onClick={handleFollow}
										className='bg-[#0095f6] text-white rounded p-2'
									>
										{t('follow')}
									</button>
								</div>
							</div>
							<div className='grid grid-cols-12   '>
								<div className='w-full col-span-12 p-2  lg:p-6  sm:col-span-6 border-solid sm:border-t-2 border-b-2 border-black'>
									<h2 className='font-bold'>{t('About the Project')}</h2>
									<p className='break-words'>{projectDetailInfo?.about}</p>
								</div>

								<div className='border-solid sm:border-l-2 border-y-2 p-2  lg:p-6  border-black col-span-12 sm:col-span-6 order-first sm:order-2'>
									<div className=' w-full flex flex-col gap-2 text-sm     '>
										<div className='flex flex-col self-center justify-self-center'>
											<div className='grid grid-cols-12'>
												<span className='col-span-11'>{t('Raised')}</span>{' '}
												<span className='col-span-1'>{t('Goal')}</span>
											</div>
											<div className='h-2 w-full bg-gray-200 rounded'>
												<div
													style={{ width: `${progress}%` }}
													className='h-2 bg-[#d4ee26] rounded'
												></div>
											</div>
											<div className='grid grid-cols-12'>
												<span className='col-span-11'>${totalAmount}</span>{' '}
												<span className='col-span-1'>
													${projectDetailInfo?.goal}
												</span>
											</div>
											<div>
												{dayLeft < 0 ? (
													<span>{t('Expired')}</span>
												) : (
													<p>
														<span>{dayLeft}</span> <span>{t('Days Left')}</span>
													</p>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='flex flex-col sm:flex-row gap-10'>
								{projectDetailInfo.goal == totalAmount ? (
									<button
										className='block py-2 pl-3 pr-4 text-center lg:w-1/2 w-full bg-green-600 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]'
										disabled
									>
										{t('This project reached its goal')}
									</button>
								) : (
									<>
										{auth.currentUser == null ? (
											<button
												className='block py-2 pl-3 pr-4 text-center lg:w-1/2 w-full bg-gray-900 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]'
												onClick={handleLogin}
											>
												{t('In order to donate you need to login!')}
											</button>
										) : (
											<button
												className='block py-2 pl-3 pr-4 text-center lg:w-1/2 w-full bg-gray-900 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]'
												onClick={handleClick}
												disabled={
													dayLeft < 0 || projectDetailInfo.goal === totalAmount
												}
											>
												{t('Fund This project')}
											</button>
										)}
									</>
								)}
								<SocialSharing projectId={params?.id} />
							</div>
						</div>
					</div>
					<div className='flex justify-center items-center w-full '>
						<div className='flex flex-col lg:flex-row w-full gap-6  '>
							<div className='flex flex-col w-full'>
								<h1 className='text-2xl'>{t('Comments')}</h1>
								<Comment projectId={params?.id} />
								<Comments projectId={params?.id} />
							</div>
							<div className='flex flex-col justify-start items-center sm:w-full lg:w-[75vh]  gap-4 '>
								<h1 className='text-2xl'>{t('Similar Projects')}</h1>

								{data.map((project) => {
									return (
										<ProjectCard
											project={project}
											key={project.id}
										></ProjectCard>
									);
								})}
							</div>
						</div>
					</div>
				</section>
			</PageLayout>
		</>
	);
}
export default ProjectDetail;
