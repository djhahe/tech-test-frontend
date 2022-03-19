/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ChangeEvent, useState } from 'react';
import { IAppTabContainer, Job, Contact } from '../common/types';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import { SearchResult } from './SearchResult';

import './QuestionOne.css';

export const QuestionOne: React.FC<IAppTabContainer> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<(Pick<Job, 'name' | 'start' | 'end'> & { contact: Contact })[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * It makes an API call to the server to get the jobs with the search term.
   * @param {string} searchTerm - string
   */
  const searchJobs = async (searchTerm: string) => {
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
  };

  /**
   * It sets the search term to the value of the input and then calls the searchJobs function with the
   * trimmed value.
   * @param e - The event object that contains the value of the search term.
   */
  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchJobs(value.trim());
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
