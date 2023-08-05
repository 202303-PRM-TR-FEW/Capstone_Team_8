import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import MyProjectCard from '@/components/MyProjectsCard';
import { useLocale, NextIntlClientProvider, useMessages } from 'next-intl';
import messages from '@/messages/en.json';
import Image from 'next/legacy/image';
import welcome from '@/public/welcome_mobile.png';
import ProgressBar from '@/components/ProgressBar';
import ConfirmPopUp from '@/components/ConfirmPopUp';
import EditProject from '@/components/EditProject';
import TransactionHistory from '@/components/TransactionHistory';

// jest.mock('useState');

describe('MyProjectCard', () => {
	const locale = 'en';
	const project = {
		id: 1,
		title: 'Project 1',
		category: 'Education',
		img: 'agljbfvljasbnf',
		about: 'asfgafgafga',
		title: 'afsljgba kjfgab',
	};
	const isConfirmOpen = false;
	const setIsConfirOpen = jest.fn();
	const isEditProjectOpen = false;
	const setIsEditProjectOpen = jest.fn();
	const isTransactionHistoryOpen = false;
	setIsTransactionHistoryOpen = jest.fn();

	const handleOpenConfirmPopUp = () => {
		setIsConfirOpen(true);
	};

	const handleOpenEditPopUp = () => {
		setIsEditProjectOpen(true);
	};

	const handleOpenTransactionHistory = () => {
		setIsTransactionHistoryOpen(true);
	};

	it('should render the correct number of categories', () => {
		const { getByText, queryByText } = render(
			<NextIntlClientProvider locale={locale} messages={messages}>
				<MyProjectCard project={project}>
					<ConfirmPopUp
						isConfirmOpen={isConfirmOpen}
						setIsConfirmOpen={setIsConfirOpen}
						project={project}
					/>
					<EditProject
						project={project}
						setIsEditProjectOpen={setIsEditProjectOpen}
					/>
					<TransactionHistory
						project={project}
						setIsTransactionHistoryOpen={setIsTransactionHistoryOpen}
					/>
					<ProgressBar project={project} />
				</MyProjectCard>
			</NextIntlClientProvider>
		);
		expect(getByText('Confirm')).toBeInTheDocument();
		expect(getByText('Edit Project')).toBeInTheDocument();
		expect(getByText('Transaction History')).toBeInTheDocument();
	});
});
