import React from 'react';

import Image from 'next/legacy/image';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next-intl/link';
import ProgressBar from './ProgressBar';

function ProjectOfTheWeek({ data }) {
	const locale = useLocale();
	const t = useTranslations();
	return (
		<div>
			{' '}
			<div className='grid grid-cols-12 gap-6 border-b-2 pb-12 '>
				<div className='w-full flex flex-col justify-center gap-12 md:pt-0 sm:col-span-7 col-span-12  '>
					<h1 className='lg:text-6xl text-4xl sm:text-5xl font-bold'>
						{t('Project Of The Week')}
					</h1>
					<div className='w-full'>
						{' '}
						<Link
							key={data[0]?.id}
							className='block py-2  '
							href={`/project/${data[0]?.id}`}
							locale={locale}
						>
							<div className='relative  md:h-[35dvh] lg:h-[40dvh] xl:h-[45dvh] 2xl:h-[50dvh] h-[30svh] w-full'>
								<Image
									src={data[0]?.img}
									layout='fill'
									className='rounded-xl drop-shadow-lg'
									objectFit='cover'
									alt='Picture of the author'
								/>
							</div>
						</Link>
					</div>
				</div>
				<div className='w-full flex flex-col gap-4 sm:col-span-5 col-span-12  justify-end items-start  '>
					<h3 className='font-bold lg:text-4xl md:text-3xl text-2xl '>
						{data[0]?.title}
					</h3>
					<p className='text-sm'>{data[0]?.about}</p>

					<ProgressBar project={data[0]} />
				</div>
			</div>
		</div>
	);
}

export default ProjectOfTheWeek;
