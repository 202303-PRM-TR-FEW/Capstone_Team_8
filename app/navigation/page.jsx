'use client';
import Image from 'next/image';
import Link from 'next/link';
import KickOffProject from '../../components/KickOffProject';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '@/components/PageLayout';
import { useRouter } from 'next/navigation';
import WithAuth from '@/components/AuthanticatedRoute';
import Loading from '../loading';
import {
	openAddProject,
	closeAddProject,
} from '../features/startproject/kickoff';
const Navigation = (props) => {
	if (props.loading || !props.user)
		return (
			<div>
				<Loading></Loading>
			</div>
		);
	const router = useRouter();
	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);

	const handleKickOffProject = () => {
		dispatch(openAddProject());
		router.push('/myprojects');
	};
	const dispatch = useDispatch();
	return (
		<>
			{' '}
			<PageLayout>
				<div className='flex flex-col justify-start sm:justify-center items-center h-[calc(100vh-64px)]  overflow-y-scroll   w-full px-12 py-6 '>
					<div className='flex flex-col lg:flex-row justify-evenly items-center w-full gap-12'>
						<div className='w-full flex justify-between flex-col gap-24'>
							<h1 className='text-center text-xl'>I want to :</h1>
							<div className='border-b-2 w-full text-center pb-4 cursor-pointer hover:text-[#d4ee26] hover:drop-shadow-sm'>
								<Link href='/projects'>
									<span className='text-3xl font-bold'> Support</span> <br />{' '}
									Other Projects
								</Link>
							</div>
							<div className='w-full text-center cursor-pointer hover:text-[#d4ee26] hover:drop-shadow-sm border-b-2 lg:border-b-0 pb-4'>
								<button onClick={handleKickOffProject}>
									<span className='text-3xl font-bold '>Kick-off</span> <br />{' '}
									my project
								</button>
							</div>
						</div>
						<div className='flex flex-col justify-center items-center bg-black rounded text-white p-6 gap-4 md:w-2/3 w-full'>
							<div className='text-center flex justify-center bg-[#d4ee26] w-full '>
								{' '}
								<Image
									src='/welcome_mobile.png'
									width={300}
									height={400}
									alt='Picture of the author'
								/>
							</div>
							<div className='text-left'>
								{' '}
								<h1>Stay informed</h1>
								<p>
									Want to be among the first people to know about amazing
									projects on our platform? Join our monthly digest of the best
									causes.
								</p>
							</div>

							<button className='bg-[#d4ee26] m-2 p-2 rounded text-black text-center w-full'>
								Join newsletter
							</button>
						</div>
					</div>
				</div>
			</PageLayout>
		</>
	);
};
export default WithAuth(Navigation);
