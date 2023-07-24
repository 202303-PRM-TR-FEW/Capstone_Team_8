import React from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import welcome from '@/public/welcome_mobile.png';
import ProgressBar from './ProgressBar';

function ProjectCard({ project }) {
	return (
		<Link
			key={project.id}
			className='block py-2 px-3 w-full max-w-md '
			href={{
				pathname: `/project/${project?.id}`,
			}}
		>
			<div
				key={project.id}
				className='flex flex-col shadow-lg gap-4 p-4 w-full   rounded-xl hover:shadow-xl transition duration-300 ease-in-out '
			>
				<div className='flex flex-col  gap-4 '>
					<div className='relative sm:h-[30dvh] h-[30svh] w-full '>
						<Image
							src={project?.img}
							layout='fill'
							className='rounded-xl drop-shadow-lg'
							objectFit='cover'
							alt='Picture of the author'
						/>
					</div>
					<div className='w-full'>
						<h1 className='pb-4'>{project.title}</h1>
						<ProgressBar project={project} />
					</div>
				</div>
			</div>
		</Link>
	);
}

export default ProjectCard;
