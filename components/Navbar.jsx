'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, auth } from '../firebase/firebase';
import SearchBar from './SearchBar';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next-intl/client';
import Link from 'next-intl/link';
import { openAddProject } from '../app/[locale]/features/startproject/kickoff';
const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSearchBarOpen, setIsSeachBarOpen] = useState(false);
	const locale = useLocale();
	const [user, setUser] = useState(null);
	const t = useTranslations();
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, [auth]);

	const router = useRouter();
	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);

	const logoutHandler = async () => {
		await logOut();
		router.push('/', { locale: locale });
		setIsOpen(false);
	};
	const loginHandler = () => {
		router.push('/login', { locale: locale });
		setIsOpen(false);
	};
	const dispatch = useDispatch();
	return (
		<nav className='w-full z-20 border-gray-200 bg-[#d4ee26]   text-center  align-middle fixed top-0 left-0 '>
			<div className='flex flex-wrap items-center justify-between  py-2 lg:py-4 px-2 sm:px-4 md:px-6 lg:px-8 relative align-middle '>
				<div className='flex flex-row justify-between '>
					<Link
						className='self-center text-2xl font-semibold whitespace-nowrap'
						href='/projects'
						locale={locale}
					>
						Givingly
					</Link>
				</div>

				<div className='relative hidden lg:block'>
					<SearchBar setIsSeachBarOpen={setIsSeachBarOpen}></SearchBar>
				</div>

				<div className='lg:flex items-center justify-between  lg:w-auto hidden'>
					<ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 '>
						<li>
							<Link
								className='block py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent hover:text-gray-700 hover:drop-shadow-xl  '
								href='/projects'
								locale={locale}
							>
								{t('Home')}
							</Link>
						</li>

						<>
							{auth.currentUser == null ? (
								''
							) : (
								<li>
									<Link
										className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-gray-700 hover:drop-shadow-xl '
										href='/myprojects'
										locale={locale}
									>
										{t('My projects')}
									</Link>
								</li>
							)}
							{auth.currentUser == null ? (
								''
							) : (
								<li>
									<Link
										className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-gray-700 hover:drop-shadow-xl '
										href='/profile'
										locale={locale}
									>
										{t('Profile')}
									</Link>
								</li>
							)}

							{auth.currentUser == null ? (
								''
							) : (
								<li
									onClick={() => {
										dispatch(openAddProject());
									}}
								>
									<Link
										className='block py-2 pl-3 pr-4 bg-gray-900 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]  '
										href='/projects'
										locale={locale}
									>
										{t('New project')}
									</Link>
								</li>
							)}
							{auth.currentUser == null ? (
								<li onClick={loginHandler}>
									<button className='block py-2 px-3  bg-blue-600 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]  '>
										{t('Login')}
									</button>
								</li>
							) : (
								<li onClick={logoutHandler}>
									<button className='block py-2 px-3 bg-red-600 text-white rounded text-center  hover:drop-shadow-xl hover:text-[#d4ee26]  '>
										{t('Logout')}
									</button>
								</li>
							)}
							<li className='flex justify-center items-center'>
								<LocaleSwitcher></LocaleSwitcher>
							</li>
						</>
					</ul>
				</div>

				<div className='lg:hidden flex justify-center items-center'>
					<button className='lg:hidden   hover:scale-105   rounded-lg text-sm px-2.5  mr-1'>
						<LocaleSwitcher></LocaleSwitcher>
					</button>{' '}
					<button
						className='lg:hidden text-gray-500  hover:scale-105  focus:outline-none focus:ring-4  rounded-lg text-sm p-2.5 mr-1'
						onClick={() => setIsSeachBarOpen(!isSearchBarOpen)}
					>
						<svg
							className='w-6  h-6 sm:w-7 sm:h-7 text-gray-500'
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
					<button
						className='lg:hidden text-gray-500  hover:scale-105  focus:outline-none focus:ring-4  rounded-lg text-sm p-2.5 '
						onClick={() => setIsOpen(!isOpen)}
					>
						<span className='sr-only'>{t('Open menu')}</span>
						<svg
							className='w-6 h-6 sm:w-8 sm:h-8'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
								clipRule='evenodd'
							></path>
						</svg>
					</button>
				</div>

				{isOpen && (
					<div className='justify-between sm:justify-end flex flex-col py-4 px-4 absolute lg:hidden top-0 left-0 bg-black  w-full transition duration-150 ease-in-out h-[100dvh]     '>
						<button
							onClick={() => {
								setIsOpen(!isOpen);
							}}
							className='text-white absolute left-0 top-0 bg-transparent p-4  text-3xl sm:text-5xl'
						>
							<svg
								height='25px'
								id='Layer_1'
								version='1.1'
								viewBox='0 0 512 512'
								width='25px'
								fill='white'
							>
								<path d='M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z' />
							</svg>
						</button>
						<p className='text-white absolute right-0 top-0 pt-4 pr-4  text-3xl sm:text-5xl'>
							Givingly
						</p>

						<ul className='flex flex-col justify-center  items-center   gap-12 sm:gap-16  p-4 md:p-0 font-medium  bg-black h-[100dvh] w-full    '>
							<li className='border-white border-b-2 w-full  pb-4 '>
								<Link
									onClick={() => {
										setIsOpen(!isOpen);
									}}
									className='block py-2 pl-3 pr-4 text-3xl sm:text-8xl  text-white rounded     hover:drop-shadow-xl '
									href='/projects'
									locale={locale}
								>
									{t('Home')}
								</Link>
							</li>

							{auth.currentUser == null ? (
								''
							) : (
								<>
									{' '}
									<li className='border-white border-b-2 w-full  pb-4 '>
										<Link
											onClick={() => {
												setIsOpen(!isOpen);
											}}
											className='block py-2 pl-3 pr-4 text-3xl sm:text-8xl  text-white rounded     hover:drop-shadow-xl '
											href='/myprojects'
											locale={locale}
										>
											{t('My projects')}
										</Link>
									</li>
									<li className=' w-full  pb-4  mb-12 '>
										<Link
											onClick={() => {
												setIsOpen(!isOpen);
											}}
											className='block py-4  pl-3 pr-4 text-white rounded text-3xl sm:text-8xl hover:drop-shadow-xl '
											href='/profile'
											locale={locale}
										>
											{t('Profile')}
										</Link>
									</li>
								</>
							)}

							{auth.currentUser == null ? (
								''
							) : (
								<li className='w-full'>
									<button
										onClick={() => {
											setIsOpen(!isOpen);
											dispatch(openAddProject());
										}}
										className='w-full  '
									>
										<Link
											className='block py-2 sm:py-4 px-4 sm:px-8  text-lg sm:text-3xl w-full bg-[#d4ee26] text-black rounded  hover:drop-shadow-xl   '
											href='/projects'
											locale={locale}
										>
											{t('New project')}
										</Link>
									</button>
								</li>
							)}
						</ul>

						<div className='w-full p-4 md:p-0'>
							{auth.currentUser == null ? (
								<button
									onClick={loginHandler}
									className='block py-2 sm:py-4 px-4 sm:px-8 w-full text-lg sm:text-3xl  bg-blue-600 text-white rounded  hover:drop-shadow-xl   '
								>
									{t('Login')}
								</button>
							) : (
								<button
									onClick={logoutHandler}
									className='block py-2 sm:py-4 px-4 sm:px-8 w-full text-lg sm:text-3xl  bg-red-600 text-white rounded  hover:drop-shadow-xl   '
								>
									{t('Logout')}
								</button>
							)}
						</div>
					</div>
				)}
				{isSearchBarOpen && (
					<div className='justify-center gap-12 z-40 flex flex-col py-4 px-4 absolute lg:hidden top-0 left-0 bg-black   w-full h-[100dvh] transition duration-150 ease-in-out   '>
						<button
							onClick={() => setIsSeachBarOpen(!isSearchBarOpen)}
							className='text-white absolute left-0 top-0 bg-transparent p-4  text-3xl sm:text-5xl'
						>
							<svg
								height='25px'
								id='Layer_1'
								version='1.1'
								viewBox='0 0 512 512'
								width='25px'
								fill='white'
							>
								<path d='M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z' />
							</svg>
						</button>
						<p className='text-white absolute right-0 top-0 pt-4 pr-4  text-3xl sm:text-5xl'>
							Givingly
						</p>

						<p className='text-white mb-12 text-3xl'>{t('Search Projects')} </p>
						<div className='absolute top-1/2 left-0 w-full px-4'>
							<SearchBar setIsSeachBarOpen={setIsSeachBarOpen}></SearchBar>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
