import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import data from './__mocks__/jobContactData';

import { QuestionOne } from './QuestionOne';

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

test('Should show search box and no data', async () => {
  const { getByPlaceholderText, getByText } = render(<QuestionOne service={service} />);
  const searchField = getByPlaceholderText('Search') as HTMLInputElement;
  expect(Boolean(searchField)).toBe(true);
  expect(getByText(/No job found/i).textContent).toBe('No job found');
});

test('Should not fetch job if input < 3 characters', async () => {
  const { getByPlaceholderText } = render(<QuestionOne service={service} />);
  const searchField = getByPlaceholderText('Search') as HTMLInputElement;
  fireEvent.change(searchField, { target: { value: 'Te' } });
  expect(service.getJobsWithSearchTerm).toHaveBeenCalledTimes(0);
});

test('Should fetch job if input >= 3 characters', async () => {
  const { getByPlaceholderText, getByText } = render(<QuestionOne service={service} />);
  const searchField = getByPlaceholderText('Search') as HTMLInputElement;
  await act(async () => {
    fireEvent.change(searchField, { target: { value: 'Bui' } });
  });
  expect(service.getJobsWithSearchTerm).toHaveBeenCalled();
  expect(getByText(/Build a fence/i).textContent).toBe('Build a fence');
});

test('Should clear jobs when clearing search field', async () => {
  const { getByPlaceholderText, getByText } = render(<QuestionOne service={service} />);
  const searchField = getByPlaceholderText('Search') as HTMLInputElement;
  await act(async () => {
    fireEvent.change(searchField, { target: { value: 'Bui' } });
  });
  expect(service.getJobsWithSearchTerm).toHaveBeenCalled();
  await act(async () => {
    fireEvent.change(searchField, { target: { value: '' } });
  });
  expect(getByText(/No job found/i).textContent).toBe('No job found');
});

test('Should log error if has error on fetching jobs', async () => {
  service.getJobsWithSearchTerm.mockImplementation(() => {
    throw new Error('error');
  });
  const { getByPlaceholderText, getByText } = render(<QuestionOne service={service} />);
  const searchField = getByPlaceholderText('Search') as HTMLInputElement;
  await act(async () => {
    fireEvent.change(searchField, { target: { value: 'Bui' } });
  });
  expect(service.getJobsWithSearchTerm).toHaveBeenCalled();
  await act(async () => {
    fireEvent.change(searchField, { target: { value: '' } });
  });
  expect(getByText(/No job found/i).textContent).toBe('No job found');
  expect(console.error).toHaveBeenCalled();
});
