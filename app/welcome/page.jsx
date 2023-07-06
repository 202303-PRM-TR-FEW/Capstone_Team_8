const Welcome = () => {
	return (
		<>
			<div className=' w-full h-[88dvh] sm:h-[92.9dvh] lg:h-[100dvh] bg-[#d4ee26] lg:px-28  lg:py-56 py-28 '>
				<div className='welcome-desktop w-full  h-full hidden lg:flex justify-end lg:justify-start  items-end lg:items-center  '>
					<div className='lg:w-1/3  flex gap-8 flex-col lg:ml-36 ml-6 mr-6'>
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

				<div className='welcome-tablet  w-full hidden h-full md:flex  justify-end lg:hidden items-end   '>
					<div className=' w-1/2 flex gap-8 flex-col lg:ml-36 ml-6 mr-6'>
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

				<div className='welcome-mobile w-full  h-full flex md:hidden justify-center px-12     '>
					<div className=' w-full flex  flex-col justify-between  '>
						<h1 className='text-6xl font-bold px-4 text-center'>Givingly</h1>

						<div className='text-center  px-4'>
							{' '}
							<h2 className='text-2xl'>Supporting great causes made easy</h2>
							<p>
								We helped over 3,500 projects and causes. Sign in today and get
								your idea kicked off or support others kick off their amazing
								projects
							</p>
							<button className='bg-black w-full p-2 text-white rounded mt-4 '>
								{' '}
								Start today
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Welcome;
