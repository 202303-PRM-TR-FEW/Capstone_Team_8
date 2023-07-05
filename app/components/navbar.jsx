'use client';

import React, { useState } from 'react';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className=' w-full border-gray-200 bg-[#d4ee26]'>
			<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative'>
				<a href='#' className='flex items-center'>
					<span className='self-center text-2xl font-semibold whitespace-nowrap'>
						Givingly
					</span>
				</a>
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
						className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
						placeholder='Search...'
					/>
				</div>
				<div className='lg:flex items-center justify-between  lg:w-auto hidden'>
					<ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 '>
						<li>
							<a
								href='#'
								className='block py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent hover:text-gray-700 hover:drop-shadow-xl  '
								aria-current='page'
							>
								Home
							</a>
						</li>
						<li>
							<a
								href='#'
								className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-gray-700 hover:drop-shadow-xl '
							>
								My projects
							</a>
						</li>
						<li>
							<a
								href='#'
								className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-gray-700 hover:drop-shadow-xl '
							>
								Profile
							</a>
						</li>
						<li>
							<a
								href='#'
								className='block py-2 pl-3 pr-4 bg-gray-900 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]  '
							>
								New project
							</a>
						</li>
					</ul>
				</div>
				<div>
					{' '}
					<button
						className='lg:hidden text-gray-500  hover:scale-105  focus:outline-none focus:ring-4  rounded-lg text-sm p-2.5 mr-1'
						onClick={() => setIsOpen(!isOpen)}
					>
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
					</button>
					<button
						className='lg:hidden text-gray-500  hover:scale-105  focus:outline-none focus:ring-4  rounded-lg text-sm p-2.5 mr-1'
						onClick={() => setIsOpen(!isOpen)}
					>
						<span className='sr-only'>Open menu</span>
						<svg
							className='w-6 h-6'
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
					<div className='items-center absolute lg:hidden top-0 left-0 bg-black   w-full h-[100dvh]   '>
						<button
							onClick={() => {
								setIsOpen(!isOpen);
							}}
							className='text-white absolute left-0 top-0 bg-transparent p-4 text-2xl'
						>
							x
						</button>
						<p className='text-white absolute right-0 top-0 pt-4 pr-4 text-5xl'>
							Givingly
						</p>

						<ul className='flex flex-col justify-center items-center content-start  gap-12  p-4 md:p-0 font-medium  bg-black h-[100dvh] w-full    '>
							<li></li>
							<li className='border-white border-b-2 w-full  pb-4 '>
								<a
									href='#'
									className='block py-2 pl-3 pr-4 text-5xl  text-white rounded     hover:drop-shadow-xl '
									aria-current='page'
								>
									Home
								</a>
							</li>
							<li className='border-white border-b-2 w-full  pb-4 '>
								<a
									href='#'
									className='block py-2 pl-3 pr-4 text-white rounded text-5xl hover:drop-shadow-xl '
								>
									My projects
								</a>
							</li>
							<li className='border-white border-b-2 w-full  pb-4  '>
								<a
									href='#'
									className='block py-2 pl-3 pr-4 text-white rounded text-5xl hover:drop-shadow-xl '
								>
									Profile
								</a>
							</li>
							<li className='w-full text-center '>
								<a
									href='#'
									className='block py-2 pl-3 pr-4 w-full text-lg sm:w-auto bg-[#d4ee26] text-black rounded  hover:drop-shadow-xl hover:text-[#d4ee26]  '
								>
									New project
								</a>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
