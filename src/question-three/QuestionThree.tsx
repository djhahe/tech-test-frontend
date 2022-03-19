import React, { useEffect, useState, useCallback } from 'react';
import { IAppTabContainer, Job, JobAllocations } from '../common/types';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import Spinner from '../components/Spinner';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import JobCard from '../components/JobCard';

import './QuestionThree.scss';

export const QuestionThree: React.FC<IAppTabContainer> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jobList, setJobList] = useState<(Job & { jobAllocations: JobAllocations[] })[]>([]);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const [jobs, jobAllocations] = await Promise.all([props.service.getJobs(), props.service.getJobAllocations()]);
      // enrich job with allocations
      const jobsResourceAllocations = jobs.map((job) => {
        return { ...job, jobAllocations: jobAllocations.filter((value) => value.jobId === job.id) };
      });
      setJobList(jobsResourceAllocations);
    } catch (error) {
      console.error(error);
      setJobList([]);
    }
    setIsLoading(false);
  }, [props.service]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <SectionGroup>
      <SectionPanel className="question_3 flex">
        <SideBar />
        <div className="main__container flex full-w">
          <Header />
          <div className="job__container flex">
            <div className="job__list">
              {!isLoading ? (
                jobList.map((job, index) => {
                  return <JobCard item={job} index={index} key={job.id} />;
                })
              ) : (
                <Spinner />
              )}
            </div>
            <div className="job__details">
              {new Array(10).fill(undefined).map((value, index) => {
                return <div className="job__detail" key={index}></div>;
              })}
            </div>
          </div>
        </div>
      </SectionPanel>
    </SectionGroup>
  );
};
