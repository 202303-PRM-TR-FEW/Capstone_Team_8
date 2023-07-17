import React from 'react';

function ProgressBar({ project }) {
	return (
		<div className=' w-full flex flex-col gap-2 text-sm'>
			<div className='h-2 w-full bg-gray-200 rounded'>
				<div
					style={{
						maxWidth: '100%',
						width: `${(project?.totalDonations / project?.goal) * 100}%`,
					}}
					className='h-2  bg-[#d4ee26] rounded'
				></div>
			</div>

			<div className='grid grid-cols-12'>
				<span className='col-span-11'>Raised</span>{' '}
				<span className='col-span-1'>Goal</span>
			</div>

			<div className='grid grid-cols-12'>
				<span className='col-span-11'>${project?.totalDonations}</span>{' '}
				<span className='col-span-1'>${project?.goal}</span>
			</div>
		</div>
	);
}

export default ProgressBar;