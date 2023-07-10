import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function SearchBar({ setIsSeachBarOpen }) {
	const [text, setText] = useState('');

	const router = useRouter();
	const searchText = (e) => {
		e.preventDefault();
		console.log(text);
		setIsSeachBarOpen(false);
		router.push('/');
		setText('');
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
