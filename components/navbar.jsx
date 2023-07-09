'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../firebase/firebase';
import { useRouter } from 'next/navigation';

import {
	closeAddProject,
	openAddProject,
} from '../app/features/startproject/kickoff';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSearchBarOpen, setIsSeachBarOpen] = useState(false);

	const router = useRouter();
	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);

	const logoutHandler = async () => {
		await logOut();
		router.push('/login');
		setIsOpen(!isOpen);
	};

	const dispatch = useDispatch();
	return (
		<nav className='w-full z-20 border-gray-200 bg-[#d4ee26] verflow-auto  text-center h-16 align-middle fixed top-0 left-0 '>
			<div className='flex flex-wrap items-center justify-between  py-2 lg:py-4 px-8 relative align-middle '>
				<div className='flex flex-row justify-between '>
					<Link
						className='self-center text-2xl font-semibold whitespace-nowrap'
						href='/'
					>
						Givingly
					</Link>
				</div>
				<div className='relative hidden lg:block'>
					<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
						<svg
							className='w-5 h-5 text-gray-500'
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
					</div>
					<input
						type='text'
						id='search-navbar'
						className='block w-72 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
						placeholder='Search...'
					/>
				</div>

				<div className='lg:flex items-center justify-between  lg:w-auto hidden'>
					<ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 '>
						<li>
							<Link
								className='block py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent hover:text-gray-700 hover:drop-shadow-xl  '
								href='/'
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-gray-700 hover:drop-shadow-xl '
								href='/myprojects'
							>
								My projects
							</Link>
						</li>
						<li>
							<Link
								className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-gray-700 hover:drop-shadow-xl '
								href='/profile'
							>
								Profile
							</Link>
						</li>

						<li onClick={logoutHandler}>
							<button className='block py-2 pl-3 pr-4 bg-red-600 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]  '>
								Logout
							</button>
						</li>
						<li
							onClick={() => {
								dispatch(openAddProject());
							}}
						>
							<Link
								className='block py-2 pl-3 pr-4 bg-gray-900 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]  '
								href='/'
							>
								New project
							</Link>
						</li>
					</ul>
				</div>
				<div className='lg:hidden'>
					{' '}
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
						className='lg:hidden text-gray-500  hover:scale-105  focus:outline-none focus:ring-4  rounded-lg text-sm p-2.5 mr-1'
						onClick={() => setIsOpen(!isOpen)}
					>
						<span className='sr-only'>Open menu</span>
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
							x
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
									href='/'
								>
									Home
								</Link>
							</li>
							<li className='border-white border-b-2 w-full  pb-4 '>
								<Link
									onClick={() => {
										setIsOpen(!isOpen);
									}}
									className='block py-2 pl-3 pr-4 text-3xl sm:text-8xl  text-white rounded     hover:drop-shadow-xl '
									href='/myprojects'
								>
									My projects
								</Link>
							</li>
							<li className=' w-full  pb-4  mb-12 '>
								<Link
									onClick={() => {
										setIsOpen(!isOpen);
									}}
									className='block py-4  pl-3 pr-4 text-white rounded text-3xl sm:text-8xl hover:drop-shadow-xl '
									href='/profile'
								>
									Profile
								</Link>
							</li>

							<li onClick={logoutHandler}>
								<button className='block py-2 pl-3 pr-4 bg-red-600 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]  '>
									Logout
								</button>
							</li>
						</ul>
						<button
							onClick={() => {
								setIsOpen(!isOpen);
								dispatch(openAddProject());
							}}
							className='w-full  '
						>
							<Link
								className='block py-2 sm:py-4 px-4 sm:px-8 w-full text-lg sm:text-3xl sm:w-auto bg-[#d4ee26] text-black rounded  hover:drop-shadow-xl   '
								href='/'
							>
								NewProject
							</Link>
						</button>
					</div>
				)}
				{isSearchBarOpen && (
					<div className='justify-center gap-12 flex flex-col py-4 px-4 absolute lg:hidden top-0 left-0 bg-black   w-full h-[100dvh] transition duration-150 ease-in-out   '>
						<button
							onClick={() => setIsSeachBarOpen(!isSearchBarOpen)}
							className='text-white absolute left-0 top-0 bg-transparent p-4  text-3xl sm:text-5xl'
						>
							x
						</button>
						<p className='text-white absolute right-0 top-0 pt-4 pr-4  text-3xl sm:text-5xl'>
							Givingly
						</p>
						<input
							placeholder='Search project'
							className=' rounded p-2 sm:p-6 text-base sm:text-3xl'
							type='text'
						/>
						<button
							onClick={() => setIsSeachBarOpen(!isSearchBarOpen)}
							className='w-full justify-self-end  '
						>
							<Link
								className='block py-2 sm:py-4 px-4 sm:px-8 w-full text-lg sm:text-3xl sm:w-auto bg-[#d4ee26] text-black rounded  hover:drop-shadow-xl hover:text-[#d4ee26]  '
								href='/'
							>
								Search
							</Link>
						</button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
