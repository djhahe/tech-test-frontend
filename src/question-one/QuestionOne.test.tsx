import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import data from '../__mocks__/jobContactData';

import { QuestionOne } from './QuestionOne';

jest.mock('./SearchResult', () => {
  return {
    SearchResult: () => <div>Search Result</div>,
  };
});
const mockSearchJobs = jest.fn();
jest.mock('../hooks/useSearchJob', () => {
  return {
    useSearchJob: () => {
      return { searchJobs: mockSearchJobs };
    },
  };
});

const service = {
  getJobs: jest.fn(),
  getActivities: jest.fn(),
  getJobAllocations: jest.fn(),
  getActivityAllocations: jest.fn(),
  getResources: jest.fn(),
  getContacts: jest.fn(),
  getJobsWithSearchTerm: jest.fn(async (searchTerm: string) => {
    return data.filter((job) => job.name.includes(searchTerm));
  }),
};

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});

test('Should show search box and search result component', async () => {
  const { getByPlaceholderText, getByText } = render(<QuestionOne service={service} />);
  const searchField = getByPlaceholderText('Search') as HTMLInputElement;
  expect(Boolean(searchField)).toBe(true);
  expect(getByText(/Search Result/i).textContent).toBe('Search Result');
});

test('Should update search box value  and do search on change', () => {
  const { getByPlaceholderText } = render(<QuestionOne service={service} />);
  const searchField = getByPlaceholderText('Search') as HTMLInputElement;
  fireEvent.change(searchField, { target: { value: 'Test' } });
  expect(searchField.value).toBe('Test');
  expect(mockSearchJobs).toHaveBeenCalledWith('Test');
});
