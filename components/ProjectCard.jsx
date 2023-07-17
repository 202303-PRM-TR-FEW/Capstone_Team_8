import React from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import welcome from '@/public/welcome_mobile.png';
import ProgressBar from './ProgressBar';

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
				<div className='flex flex-col w-96 '>
					<div className=' block w-96 h-64   '>
						{' '}
						<Image
							src={project?.img || welcome}
							width={100}
							height={64}
							layout='responsive'
							alt='profile-picture'
						/>{' '}
					</div>
					<h1>{project.title}</h1>
					<ProgressBar project={project} />
				</div>
			</div>
		</Link>
	);
}

export default ProjectCard;
