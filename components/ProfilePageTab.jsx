import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import ChangeProfileImg from './ChangeProfileImg';
import { useTranslations } from 'next-intl';
function ProfilePageTab() {
	const [activeTab, setActiveTab] = useState('Profile Info');
	const handleTabClick = (tabId) => {
		setActiveTab(tabId);
	};
	const t = useTranslations();
	return (
		<>
			<div className='mb-4 border-b border-gray-200 w-full  '>
				<ul
					className='flex w-full  overflow-auto  text-sm sm:text-base md:text-md lg:text-lg xl:text-lg font-medium text-center'
					id='myTab'
					data-tabs-toggle='#myTabContent'
					role='tablist'
				>
					<li className='mr-2 w-full' role='presentation'>
						<button
							className={`inline-block p-4 border-b-2 rounded-t-lg font-bold ${
								activeTab === 'Profile Info'
									? 'border-indigo-500'
									: 'border-transparent'
							}`}
							id='Profile Info-tab'
							data-tabs-target='#Profile Info'
							type='button'
							role='tab'
							aria-controls='Profile Info'
							aria-selected={activeTab === 'Profile Info'}
							onClick={() => handleTabClick('Profile Info')}
						>
							{t('Profile Info')}
						</button>
					</li>
					<li className='mr-2 w-full' role='presentation'>
						<button
							className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 font-bold   ${
								activeTab === 'Change Password'
									? 'border-indigo-500'
									: 'border-transparent'
							}`}
							id='Change Password-tab'
							data-tabs-target='#Change Password'
							type='button'
							role='tab'
							aria-controls='Change Password'
							aria-selected={activeTab === 'Change Password'}
							onClick={() => handleTabClick('Change Password')}
						>
							{t('Change Password')}
						</button>
					</li>
					<li className='mr-2 w-full' role='presentation'>
						<button
							className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 font-bold   ${
								activeTab === 'Change Profile Picture'
									? 'border-indigo-500'
									: 'border-transparent'
							}`}
							id='Change Profile Picture-tab'
							data-tabs-target='#Change Profile Picture'
							type='button'
							role='tab'
							aria-controls='Change Profile Picture'
							aria-selected={activeTab === 'Change Profile Picture'}
							onClick={() => handleTabClick('Change Profile Picture')}
						>
							{t('Change Profile Picture')}
						</button>
					</li>
				</ul>
			</div>
			<div id='myTabContent'>
				<div
					className={`p-4 rounded-lg bg-gray-50  ${
						activeTab === 'Profile Info' ? 'block' : 'hidden'
					}`}
					id='Profile Info'
					role='tabpanel'
					aria-labelledby='Profile Info-tab'
				>
					<ProfileInfo />
				</div>
				<div
					className={`p-4 rounded-lg bg-gray-50  ${
						activeTab === 'Change Password' ? 'block' : 'hidden'
					}`}
					id='Change Password'
					role='tabpanel'
					aria-labelledby='Change Password-tab'
				>
					<ChangePassword />
				</div>
				<div
					className={`p-4 rounded-lg bg-gray-50 ${
						activeTab === 'Change Profile Picture' ? 'block' : 'hidden'
					}`}
					id='Change Profile Picture'
					role='tabpanel'
					aria-labelledby='Change Profile Picture-tab'
				>
					<ChangeProfileImg />
				</div>
			</div>
		</>
	);
}

export default ProfilePageTab;
