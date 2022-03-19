import React from 'react';
import { render } from '@testing-library/react';

import { SearchResult } from './SearchResult';
import mockJobContactData from './__mocks__/jobContactData';

jest.mock('../components/Spinner', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Loading</div>;
    },
  };
});

test('Should show no data message if search result is empty', async () => {
  const { getByText } = render(<SearchResult searchResult={[]} />);
  expect(expect(getByText('No job found').textContent).toBe('No job found'));
});

test('Should show loading indicator if on loading', async () => {
  const { getByText } = render(<SearchResult searchResult={[]} isLoading={true} />);
  expect(expect(getByText('Loading').textContent).toBe('Loading'));
});

test('Should render job information', async () => {
  const { getAllByText } = render(<SearchResult searchResult={mockJobContactData} />);

  expect(expect(getAllByText(/Job 1/i)[0].textContent).toBe('Job 1'));
  expect(expect(getAllByText(/Name/i)[0].textContent).toBe('Name'));
  expect(expect(getAllByText(/Build a fence/i)[0].textContent).toBe('Build a fence'));
  expect(expect(getAllByText(/Start/i)[0].textContent).toBe('Start'));
  expect(expect(getAllByText(/2018-09-01T10:00:00Z/i)[0].textContent).toBe('2018-09-01T10:00:00Z'));
  expect(expect(getAllByText(/End/i)[0].textContent).toBe('End'));
  expect(expect(getAllByText(/2018-09-01T11:00:00Z/i)[0].textContent).toBe('2018-09-01T11:00:00Z'));
  expect(expect(getAllByText(/Contact/i)[0].textContent).toBe('Contact'));
  expect(expect(getAllByText(/John Smith/i)[0].textContent).toBe('John Smith'));
});
