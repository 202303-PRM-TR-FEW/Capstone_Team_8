import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import welcome from '@/public/welcome_mobile.png';

function ProjectCard({ project, props }) {
	return (
		<Link
			key={project.id}
			className='block py-2 px-3 '
			href={{
				pathname: `/project/${project?.id}`,
				query: { loading: props.loading, user: props.user },
			}}
		>
			<div key={project.id} className='flex flex-col shadow-lg gap-4 p-6 '>
				<div className='flex flex-col w-96'>
					<div className='relative w-96 h-64 '>
						{' '}
						<Image
							className='rounded'
							src={project?.img || welcome}
							layout='fill'
							alt='Picture of the author'
						/>
					</div>
					<h1>{project.title}</h1>
					<div className=' w-full flex flex-col gap-2 text-sm'>
						<div className='h-2 w-full bg-gray-200 rounded'>
							<div
								style={{
									maxWidth: '100%',
									width: `${(project.totalDonations / project.goal) * 100}%`,
								}}
								className='h-2  bg-[#d4ee26] rounded'
							></div>
						</div>

						<div className='grid grid-cols-12'>
							<span className='col-span-11'>Raised</span>{' '}
							<span className='col-span-1'>Goal</span>
						</div>

						<div className='grid grid-cols-12'>
							<span className='col-span-11'>${project.totalDonations}</span>{' '}
							<span className='col-span-1'>${project.goal}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default ProjectCard;
