const Welcome = () => {
	return (
		<>
			<div className=' w-full h-[100dvh] bg-[#d4ee26] lg:px-28  lg:py-16 py-8 '>
				<div className='welcome-desktop w-full  h-full flex justify-end lg:justify-start  items-end lg:items-center  '>
					<div className='lg:w-1/3 w-1/2 flex gap-8 flex-col lg:ml-36 ml-6 mr-6'>
						<h1 className='text-8xl font-bold'>Givingly</h1>
						<h2 className='text-3xl'>Supporting great causes made easy</h2>
						<p>
							We helped over 3,500 projects and causes. Sign in today and get
							your idea kicked off or support others kick off their amazing
							projects
						</p>
						<button className='bg-black  p-2 text-white rounded '>
							{' '}
							Start today
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Welcome;
