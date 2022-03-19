import _debounce from 'lodash-es/debounce';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { IAppTabContainer, Job, Contact } from '../common/types';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import { SearchResult } from './SearchResult';

import './QuestionOne.css';

export const QuestionOne: React.FC<IAppTabContainer> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<(Pick<Job, 'name' | 'start' | 'end'> & { contact: Contact })[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounceSetSearchTerm = _debounce(setSearchTerm);

  /**
   * It makes an API call to the server to get the jobs with the search term.
   */
  const searchJobs = useCallback(async () => {
    if (searchTerm) {
      if (searchTerm.length >= 3) {
        setIsLoading(true);
        try {
          const jobs = await props.service.getJobsWithSearchTerm(searchTerm);
          setSearchResult(jobs);
        } catch (error) {
          console.error(error);
          setSearchResult([]);
        }
        setIsLoading(false);
      }
    } else {
      setSearchResult([]);
    }
  }, [searchTerm, props.service]);

  useEffect(() => {
    searchJobs();
  }, [searchJobs]);

  /**
   * It sets the search term to the value of the input and then calls the searchJobs function with the
   * trimmed value.
   * @param e - The event object that contains the value of the search term.
   */
  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debounceSetSearchTerm(value);
  };

  return (
    <SectionGroup>
      <SectionPanel>
        <input placeholder="Search" value={searchTerm} onChange={onSearchTermChange}></input>
        <SearchResult isLoading={isLoading} searchResult={searchResult} />
      </SectionPanel>
    </SectionGroup>
  );
};
