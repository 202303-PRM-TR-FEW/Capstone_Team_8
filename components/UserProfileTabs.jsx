import React, { useState } from 'react';
import UsersProjects from './UsersProjects';
import UserDonatedProjects from './UserDonatedProjects';
import { useTranslations } from 'next-intl';
function Tabs({ user, filteredData, userDonatedProjects }) {
	const [activeTab, setActiveTab] = useState('UsersProjects');

	const handleTabClick = (tabId) => {
		setActiveTab(tabId);
	};
	const t = useTranslations();
	return (
		<>
			<div className='mb-4 border-b border-gray-200 w-full pt-12 sm:pt-2 '>
				<ul
					className='flex  w-full  overflow-auto  text-sm sm:text-base md:text-md lg:text-lg xl:text-lg font-medium text-center'
					id='myTab'
					data-tabs-toggle='#myTabContent'
					role='tablist'
				>
					<li className='mr-2 w-full' role='presentation'>
						<button
							className={`inline-block p-4 border-b-2 rounded-t-lg font-bold  ${
								activeTab === 'UsersProjects'
									? 'border-indigo-500'
									: 'border-transparent'
							}`}
							id='UsersProjects-tab'
							data-tabs-target='#UsersProjects'
							type='button'
							role='tab'
							aria-controls='UsersProjects'
							aria-selected={activeTab === 'UsersProjects'}
							onClick={() => handleTabClick('UsersProjects')}
						>
							{t('UsersProjects')}
						</button>
					</li>
					<li className='mr-2 w-full' role='presentation'>
						<button
							className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 font-bold   ${
								activeTab === 'UserDonatedProjects'
									? 'border-indigo-500'
									: 'border-transparent'
							}`}
							id='UserDonatedProjects-tab'
							data-tabs-target='#UserDonatedProjects'
							type='button'
							role='tab'
							aria-controls='UserDonatedProjects'
							aria-selected={activeTab === 'UserDonatedProjects'}
							onClick={() => handleTabClick('UserDonatedProjects')}
						>
							{t('UserDonatedProjects')}
						</button>
					</li>
				</ul>
			</div>
			<div id='myTabContent'>
				<div
					className={`p-4 rounded-lg bg-gray-50  ${
						activeTab === 'UsersProjects' ? 'block' : 'hidden'
					}`}
					id='UsersProjects'
					role='tabpanel'
					aria-labelledby='UsersProjects-tab'
				>
					<UsersProjects user={user} filteredData={filteredData} />
				</div>
				<div
					className={`p-4 rounded-lg bg-gray-50  ${
						activeTab === 'UserDonatedProjects' ? 'block' : 'hidden'
					}`}
					id='UserDonatedProjects'
					role='tabpanel'
					aria-labelledby='UserDonatedProjects-tab'
				>
					<UserDonatedProjects
						filteredData={filteredData}
						userDonatedProjects={userDonatedProjects}
						user={user}
					/>
				</div>
			</div>
		</>
	);
}

export default Tabs;
