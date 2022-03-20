import { useState, useCallback } from 'react';
import { IDataService, Job, Contact } from '../common/types';
import { debounce } from '../helper/debounce';

export const useSearchJob = (searchService: IDataService['getJobsWithSearchTerm']) => {
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

      // Do search if search term >= 3 chars
      if (searchTerm.length >= 3) {
        setIsLoading(true);
        try {
          const result = await searchService(searchTerm);
          setSearchResult(result);
        } catch (error) {
          setSearchResult([]);
        }
        setIsLoading(false);
      }
    }, 500),
    [searchService],
  );

  return { jobs: searchResult, isLoading, searchJobs };
};
