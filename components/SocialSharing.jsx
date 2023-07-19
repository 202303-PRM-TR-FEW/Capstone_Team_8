import React from 'react';
import {
	FacebookShareButton,
	FacebookIcon,
	RedditShareButton,
	RedditIcon,
	WhatsappShareButton,
	WhatsappIcon,
	LinkedinShareButton,
	LinkedinIcon,
	TwitterShareButton,
	TwitterIcon,
} from 'next-share';

function SocialSharing({ projectId }) {
	return (
		<div className='flex gap-2 justify-center'>
			<FacebookShareButton
				url={`capstone-team-8.vercel.app/project/${projectId}`}
			>
				<FacebookIcon size={32} round />
			</FacebookShareButton>
			<RedditShareButton
				url={`capstone-team-8.vercel.app/project/${projectId}`}
			>
				<RedditIcon size={32} round />
			</RedditShareButton>
			<WhatsappShareButton
				url={`capstone-team-8.vercel.app/project/${projectId}`}
			>
				<WhatsappIcon size={32} round />
			</WhatsappShareButton>
			<LinkedinShareButton
				url={`capstone-team-8.vercel.app/project/${projectId}`}
			>
				<LinkedinIcon size={32} round />
			</LinkedinShareButton>
			<TwitterShareButton
				url={`capstone-team-8.vercel.app/project/${projectId}`}
			>
				<TwitterIcon size={32} round />
			</TwitterShareButton>
		</div>
	);
}

export default SocialSharing;
