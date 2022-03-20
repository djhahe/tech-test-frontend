import { renderHook, cleanup } from '@testing-library/react-hooks';
import { useSearchJob } from './useSearchJob';
import data from '../__mocks__/jobContactData';

const getJobsWithSearchTerm = jest.fn(async (searchTerm: string) => {
  return data.filter((job) => job.name.includes(searchTerm));
});

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
  getJobsWithSearchTerm.mockClear();
  cleanup();
});

test('Should return empty array if no search term', async () => {
  const { result } = renderHook(() => useSearchJob(getJobsWithSearchTerm));
  const { jobs, searchJobs } = result.current;
  await searchJobs('');
  expect(jobs).toEqual([]);
});

test('Should not fetch jobs if input length < min search characters', async () => {
  const { result } = renderHook(() => useSearchJob(getJobsWithSearchTerm, undefined, 4));
  const { searchJobs, jobs } = result.current;
  await searchJobs('Bui');
  jest.advanceTimersByTime(500);
  expect(getJobsWithSearchTerm).toBeCalledTimes(0);
  expect(jobs).toEqual([]);
});

test('Should not fetch jobs if not reach the debounce delay yet', async () => {
  const { result } = renderHook(() => useSearchJob(getJobsWithSearchTerm, 1000));
  const { searchJobs, jobs } = result.current;
  await searchJobs('Bui');
  jest.advanceTimersByTime(500);
  expect(getJobsWithSearchTerm).toBeCalledTimes(0);
  expect(jobs).toEqual([]);
});

test('Should fetch jobs if input length >= min search characters', async () => {
  const { result } = renderHook(() => useSearchJob(getJobsWithSearchTerm));
  const { searchJobs, jobs } = result.current;
  await searchJobs('Bui');
  jest.advanceTimersByTime(500);
  expect(getJobsWithSearchTerm).toBeCalledTimes(1);
  expect(jobs).toEqual([]);
});

test('Should log error on service error', async () => {
  getJobsWithSearchTerm.mockImplementation(() => {
    throw new Error('error');
  });
  const { result } = renderHook(() => useSearchJob(getJobsWithSearchTerm));
  const { searchJobs, jobs } = result.current;
  await searchJobs('Bui');
  jest.advanceTimersByTime(500);
  expect(getJobsWithSearchTerm).toBeCalledTimes(1);
  expect(jobs).toEqual([]);
});
