import { fetchDocById } from '../../../firebase/firebase';
import PageLayout from '@/components/pageLayout';
export default async function ProjectDetail({ params }) {
	if (!params || !params.id) {
		return <div>Error: Missing user ID</div>;
	}
	const projectDetail = await fetchDocById(params.id);

	// const userPosts = getUserPosts(params?.id);
	// const posts = await userPosts;
	// const userData = getUser(params?.id);
	// const user = await userData;
	// console.log(user);

	return (
		<PageLayout>
			<main className='flex min-h-screen flex-col items-center justify-between p-2 sm:p-24'>
				<div>{projectDetail?.title}</div>
			</main>
		</PageLayout>
	);
}
