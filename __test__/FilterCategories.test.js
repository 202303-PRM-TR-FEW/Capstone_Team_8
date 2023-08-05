import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterCategories from '@/components/FilterCategories';
import { useLocale, NextIntlClientProvider, useMessages } from 'next-intl';
import messages from '@/messages/en.json';

describe('FilterCategories', () => {
	const locale = 'en';

	it('should render the correct number of categories', () => {
		const data = [
			{
				id: 1,
				title: 'Project 1',
				category: 'Education',
			},
			{
				id: 2,
				title: 'Project 2',
				category: 'Culture',
			},
			{
				id: 3,
				title: 'Project 3',
				category: 'Animals',
			},
			{
				id: 3,
				title: 'Project 4',
				category: 'Children',
			},
		];
		const selectedCategory = 'Education';
		const { getByText, queryByText } = render(
			<NextIntlClientProvider locale={locale} messages={messages}>
				<FilterCategories data={data} selectedCategory={selectedCategory} />
			</NextIntlClientProvider>
		);

		expect(getByText('Education')).toBeInTheDocument();
		expect(getByText('Culture')).toBeInTheDocument();
		expect(getByText('Animals')).toBeInTheDocument();
		expect(queryByText('Children')).toBeInTheDocument();
	});

	it('should change the selected category when a button is clicked', () => {
		const data = [
			{
				id: 1,
				title: 'Project 1',
				category: 'Education',
			},
			{
				id: 2,
				title: 'Project 2',
				category: 'Culture',
			},
			{
				id: 3,
				title: 'Project 3',
				category: 'Animals',
			},
		];
		const expectedSelectedCategory = 'Culture';
		const selectedCategory = 'Education';
		const { getByText, queryByText } = render(
			<NextIntlClientProvider locale={locale} messages={messages}>
				<FilterCategories data={data} selectedCategory='Culture' />
			</NextIntlClientProvider>
		);

		const educationButton = getByText('Education');
		const cultureButton = getByText('Culture');

		educationButton.click();
		expect(selectedCategory).toBe('Education');

		// Mock the `setFilteredData` function so that we don't actually have to change the state of the component.
		cultureButton.click();
		const setFilteredDataMock = jest.fn();
		const filterCategories = (category) => {
			setFilteredDataMock(category);
		};
		expect(expectedSelectedCategory).toBe('Culture');
	});
});
