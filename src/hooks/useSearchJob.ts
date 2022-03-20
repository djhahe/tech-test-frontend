import { useState, useCallback } from 'react';
import { IDataService, Job, Contact } from '../common/types';
import { debounce } from '../helper/debounce';

const DEFAULT_DELAY = 500;
const DEFAULT_MIN_SEARCH_CHAR = 3;

export const useSearchJob = (
  searchService: IDataService['getJobsWithSearchTerm'],
  debounceDelay: number = DEFAULT_DELAY,
  minSearchChars: number = DEFAULT_MIN_SEARCH_CHAR,
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<(Pick<Job, 'name' | 'start' | 'end'> & { contact: Contact })[]>([]);

  /**
   * It makes an API call to the searchService function and sets the searchResult state to the result
   * of the API call.
   */
  const searchJobs = useCallback(
    debounce(async (searchTerm) => {
      // Set result to empty if no search term
      if (!searchTerm) {
        setSearchResult([]);
        return;
      }

      // Do search if search term >= min search chars
      if (searchTerm.length >= minSearchChars) {
        setIsLoading(true);
        try {
          const result = await searchService(searchTerm);

          setSearchResult(result);
        } catch (error) {
          setSearchResult([]);
        }
        setIsLoading(false);
      }
    }, debounceDelay),
    [searchService],
  );

  return { jobs: searchResult, isLoading, searchJobs };
};
