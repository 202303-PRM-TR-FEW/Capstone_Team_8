import { usePathname, useRouter } from 'next-intl/client';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLang } from '@/app/[locale]/features/lang/langSlice';

function LocaleSwitcher() {
	const langValue = useSelector((state) => state.lang);
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useDispatch();
	const [showPopover, setShowPopover] = useState(false);
	// const [activeLocale, setActiveLocale] = useState(router.locale);
	const ref = useRef();
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setShowPopover(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);

	const handleLocaleChange = (locale) => {
		dispatch(setLang(locale));
		router.replace(pathname, { locale });
		setShowPopover(false);
		// setTimeout(() => {
		// 	window.location.reload();
		// }, 100);
	};

	return (
		<div ref={ref} className='flex items-center justify-center relative'>
			<svg
				className='w-6 h-6'
				id='Layer_1'
				data-name='Layer 1'
				viewBox='0 0 512 512'
				fill='blue'
				onClick={() => setShowPopover(!showPopover)}
			>
				<path d='M512,256c0,141.39-114.62,256-256,256S0,397.39,0,256,114.62,0,256,0,512,114.63,512,256ZM123,243.42a365.39,365.39,0,0,1,17.8-101.84l-85.52-.08a229.68,229.68,0,0,0-30,101.93ZM243.51,141.5H167.28A338.35,338.35,0,0,0,148,243.42h95.53Zm0-116.21c-26.92,24-49.63,55.13-66,91h66Zm-171.66,91h78.43a320.78,320.78,0,0,1,52.23-85C148.55,43.48,102.41,76,71.84,116.28ZM486.7,243.42a229.57,229.57,0,0,0-30-101.93l-85.53.08A365.52,365.52,0,0,1,389,243.42Zm-218.2,0H364a337.76,337.76,0,0,0-19.3-101.93H268.5Zm0-127.14h66c-16.42-35.86-39.13-66.95-66-91Zm41-85a320.19,320.19,0,0,1,52.23,85h78.42C409.59,76,363.45,43.48,309.5,31.3ZM25.31,268.57a229.63,229.63,0,0,0,30,101.94l85.52-.08A365.34,365.34,0,0,1,123,268.57Zm218.2,0H148a338.32,338.32,0,0,0,19.3,101.94h76.23Zm0,127.17h-66c16.42,35.86,39.13,66.92,66,91Zm-41,85a320.79,320.79,0,0,1-52.23-85H71.84C102.41,436,148.55,468.54,202.5,480.7ZM389,268.57a365.47,365.47,0,0,1-17.81,101.86l85.53.08a229.52,229.52,0,0,0,30-101.94ZM268.5,370.51h76.21A337.73,337.73,0,0,0,364,268.57H268.5Zm0,116.22c26.91-24.07,49.63-55.13,66-91h-66Zm171.65-91H361.73a320.19,320.19,0,0,1-52.23,85C363.45,468.54,409.59,436,440.15,395.74Z' />
			</svg>
			{showPopover && (
				<div className='absolute bg-white border flex flex-col top-8 left-0  border-gray-300 rounded p-2'>
					<button
						className={`px-2 py-1 w-8 h-8  ${
							langValue === 'en' ? 'border border-red-400' : 'border-none'
						}`}
						onClick={() => handleLocaleChange('en')}
					>
						<svg viewBox='0 0 55.2 38.4'>
							<g>
								<path
									className='st0'
									d='M3.03,0h49.13c1.67,0,3.03,1.36,3.03,3.03v32.33c0,1.67-1.36,3.03-3.03,3.03H3.03C1.36,38.4,0,37.04,0,35.37 V3.03C0,1.36,1.36,0,3.03,0L3.03,0z'
								/>
								<path
									className='st1'
									d='M0.02,2.73h55.17c0.01,0.1,0.02,0.2,0.02,0.31v2.94H0V3.03C0,2.93,0.01,2.83,0.02,2.73L0.02,2.73z M55.2,8.67 v3.24H0V8.67H55.2L55.2,8.67z M55.2,14.61v3.24H0v-3.24H55.2L55.2,14.61z M55.2,20.55v3.24H0v-3.24H55.2L55.2,20.55z M55.2,26.49 v3.24H0v-3.24H55.2L55.2,26.49z M55.2,32.43v2.93c0,0.1-0.01,0.21-0.02,0.31H0.02C0.01,35.58,0,35.47,0,35.37v-2.93H55.2 L55.2,32.43z'
								/>
								<path
									className='st2'
									d='M20.8,0v20.68H0V3.03C0,1.36,1.36,0,3.03,0H20.8L20.8,0L20.8,0z'
								/>
								<polygon
									className='st1'
									points='1.23,2.86 1.92,5.01 0.1,3.68 2.36,3.68 0.53,5.01 1.23,2.86'
								/>
								<polygon
									className='st1'
									points='1.23,7.02 1.92,9.17 0.1,7.84 2.36,7.84 0.53,9.17 1.23,7.02'
								/>
								<polygon
									className='st1'
									points='1.23,11.18 1.92,13.33 0.1,12 2.36,12 0.53,13.33 1.23,11.18'
								/>
								<polygon
									className='st1'
									points='1.23,15.34 1.92,17.49 0.1,16.16 2.36,16.16 0.53,17.49 1.23,15.34'
								/>
								<polygon
									className='st1'
									points='3.67,0.78 4.37,2.93 2.54,1.6 4.81,1.6 2.97,2.93 3.67,0.78'
								/>
								<polygon
									className='st1'
									points='3.67,4.94 4.37,7.09 2.54,5.76 4.81,5.76 2.97,7.09 3.67,4.94'
								/>
								<polygon
									className='st1'
									points='3.67,9.1 4.37,11.25 2.54,9.92 4.81,9.92 2.97,11.25 3.67,9.1'
								/>
								<polygon
									className='st1'
									points='3.67,13.26 4.37,15.41 2.54,14.08 4.81,14.08 2.97,15.41 3.67,13.26'
								/>
								<polygon
									className='st1'
									points='3.67,17.42 4.37,19.57 2.54,18.24 4.81,18.24 2.97,19.57 3.67,17.42'
								/>
								<polygon
									className='st1'
									points='6.12,2.86 6.82,5.01 4.99,3.68 7.25,3.68 5.42,5.01 6.12,2.86'
								/>
								<polygon
									className='st1'
									points='6.12,7.02 6.82,9.17 4.99,7.84 7.25,7.84 5.42,9.17 6.12,7.02'
								/>
								<polygon
									className='st1'
									points='6.12,11.18 6.82,13.33 4.99,12 7.25,12 5.42,13.33 6.12,11.18'
								/>
								<polygon
									className='st1'
									points='6.12,15.34 6.82,17.49 4.99,16.16 7.25,16.16 5.42,17.49 6.12,15.34'
								/>
								<polygon
									className='st1'
									points='8.57,0.78 9.26,2.93 7.44,1.6 9.7,1.6 7.87,2.93 8.57,0.78'
								/>
								<polygon
									className='st1'
									points='8.57,4.94 9.26,7.09 7.44,5.76 9.7,5.76 7.87,7.09 8.57,4.94'
								/>
								<polygon
									className='st1'
									points='8.57,9.1 9.26,11.25 7.44,9.92 9.7,9.92 7.87,11.25 8.57,9.1'
								/>
								<polygon
									className='st1'
									points='8.57,13.26 9.26,15.41 7.44,14.08 9.7,14.08 7.87,15.41 8.57,13.26'
								/>
								<polygon
									className='st1'
									points='8.57,17.42 9.26,19.57 7.44,18.24 9.7,18.24 7.87,19.57 8.57,17.42'
								/>
								<polygon
									className='st1'
									points='11.01,2.86 11.71,5.01 9.88,3.68 12.14,3.68 10.31,5.01 11.01,2.86'
								/>
								<polygon
									className='st1'
									points='11.01,7.02 11.71,9.17 9.88,7.84 12.14,7.84 10.31,9.17 11.01,7.02'
								/>
								<polygon
									className='st1'
									points='11.01,11.18 11.71,13.33 9.88,12 12.14,12 10.31,13.33 11.01,11.18'
								/>
								<polygon
									className='st1'
									points='11.01,15.34 11.71,17.49 9.88,16.16 12.14,16.16 10.31,17.49 11.01,15.34'
								/>
								<polygon
									className='st1'
									points='13.46,0.78 14.16,2.93 12.33,1.6 14.59,1.6 12.76,2.93 13.46,0.78'
								/>
								<polygon
									className='st1'
									points='13.46,4.94 14.16,7.09 12.33,5.76 14.59,5.76 12.76,7.09 13.46,4.94'
								/>
								<polygon
									className='st1'
									points='13.46,9.1 14.16,11.25 12.33,9.92 14.59,9.92 12.76,11.25 13.46,9.1'
								/>
								<polygon
									className='st1'
									points='13.46,13.26 14.16,15.41 12.33,14.08 14.59,14.08 12.76,15.41 13.46,13.26'
								/>
								<polygon
									className='st1'
									points='13.46,17.42 14.16,19.57 12.33,18.24 14.59,18.24 12.76,19.57 13.46,17.42'
								/>
								<polygon
									className='st1'
									points='15.9,2.86 16.6,5.01 14.77,3.68 17.03,3.68 15.21,5.01 15.9,2.86'
								/>
								<polygon
									className='st1'
									points='15.9,7.02 16.6,9.17 14.77,7.84 17.03,7.84 15.21,9.17 15.9,7.02'
								/>
								<polygon
									className='st1'
									points='15.9,11.18 16.6,13.33 14.77,12 17.03,12 15.21,13.33 15.9,11.18'
								/>
								<polygon
									className='st1'
									points='15.9,15.34 16.6,17.49 14.77,16.16 17.03,16.16 15.21,17.49 15.9,15.34'
								/>
								<polygon
									className='st1'
									points='18.35,0.78 19.05,2.93 17.22,1.6 19.48,1.6 17.65,2.93 18.35,0.78'
								/>
								<polygon
									className='st1'
									points='18.35,4.94 19.05,7.09 17.22,5.76 19.48,5.76 17.65,7.09 18.35,4.94'
								/>
								<polygon
									className='st1'
									points='18.35,9.1 19.05,11.25 17.22,9.92 19.48,9.92 17.65,11.25 18.35,9.1'
								/>
								<polygon
									className='st1'
									points='18.35,13.26 19.05,15.41 17.22,14.08 19.48,14.08 17.65,15.41 18.35,13.26'
								/>
								<polygon
									className='st1'
									points='18.35,17.42 19.05,19.57 17.22,18.24 19.48,18.24 17.65,19.57 18.35,17.42'
								/>
							</g>
						</svg>
					</button>
					<button
						className={`px-2 py-1 ${
							langValue === 'tr' ? 'border border-red-400' : 'border-none'
						}`}
						onClick={() => handleLocaleChange('tr')}
					>
						<svg viewBox='0 0 512.001 512.001'>
							<path
								fill='#FF4B55'
								d='M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z'
							/>
							<g>
								{' '}
								<path
									fill='#F5F5F5'
									d='M253.474,225.753l13.837,18.101l21.606-7.232c1.208-0.404,2.236,0.962,1.512,2.01l-12.939,18.753   l13.555,18.314c0.758,1.024-0.224,2.423-1.444,2.059l-21.834-6.511l-13.228,18.55c-0.739,1.037-2.375,0.536-2.406-0.737   l-0.555-22.777l-21.73-6.849c-1.215-0.383-1.244-2.092-0.042-2.515l21.491-7.566l-0.202-22.783   C251.083,225.296,252.701,224.741,253.474,225.753z'
								/>{' '}
								<path
									fill='#F5F5F5'
									d='M176.956,326.662c-38.995,0-70.627-31.633-70.627-70.663c0-38.958,31.633-70.662,70.627-70.662   c14.508,0,27.887,4.462,39.037,12.014c1.707,1.156,3.656-1.087,2.227-2.573c-16.664-17.325-40.248-27.894-66.398-27.001   c-44.926,1.533-82.118,37.553-84.989,82.413c-3.287,51.383,37.399,94.086,88.055,94.086c24.953,0,47.379-10.432,63.393-27.112   c1.415-1.473-0.538-3.683-2.229-2.537C204.89,322.196,191.489,326.662,176.956,326.662z'
								/>
							</g>
						</svg>
					</button>
				</div>
			)}
		</div>
	);
}

export default LocaleSwitcher;