import React, { ChangeEvent, useState } from 'react';
import { IAppTabContainer } from '../common/types';
import { useSearchJob } from '../hooks/useSearchJob';
import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import { SearchResult } from './SearchResult';

import './QuestionOne.css';

export const QuestionOne: React.FC<IAppTabContainer> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { isLoading, jobs, searchJobs } = useSearchJob(props.service.getJobsWithSearchTerm);

  /**
   * It takes an event object as a parameter, and it uses that event object to set the search term
   * @param e - The event object that was passed to the callback.
   */

  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchTerm(value);
    searchJobs(value.trim());
  };

  return (
    <SectionGroup>
      <SectionPanel>
        <input type="search" placeholder="Search" value={searchTerm} onChange={onSearchTermChange}></input>
        <SearchResult isLoading={isLoading} searchResult={jobs} />
      </SectionPanel>
    </SectionGroup>
  );
};
