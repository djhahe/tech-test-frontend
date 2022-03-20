import { renderHook, cleanup } from '@testing-library/react-hooks';
import { useSearchJob } from './useSearchJob';
import data from '../__mocks__/jobContactData';

const getJobsWithSearchTerm = jest.fn(async (searchTerm: string) => {
  return data.filter((job) => job.name.includes(searchTerm));
});

beforeEach(() => {
  getJobsWithSearchTerm.mockClear();
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
  cleanup();
});

test('Should return empty array if no search term', async () => {
  const { result } = renderHook(() => useSearchJob(getJobsWithSearchTerm));
  const { jobs, searchJobs } = result.current;
  await searchJobs('');
  expect(jobs).toEqual([]);
});

test('Should not fetch jobs if input < 3 characters', async () => {
  const { result } = renderHook(() => useSearchJob(getJobsWithSearchTerm));
  const { searchJobs, jobs } = result.current;
  await searchJobs('Bu');
  expect(getJobsWithSearchTerm).toBeCalledTimes(0);
  expect(jobs).toEqual([]);
});

test('Should fetch jobs if input >= 3 characters', async () => {
  const { result } = renderHook(() => useSearchJob(getJobsWithSearchTerm));
  const { searchJobs, jobs } = result.current;
  await searchJobs('Buil');
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
