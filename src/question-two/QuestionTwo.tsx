import React, { useEffect, useState, useCallback } from 'react';
import { IAppTabContainer, ResourceSchedule } from '../common/types';
import { getResourceAllocation } from '../helper/resourceSchedule';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';

export const QuestionTwo: React.FC<IAppTabContainer> = (props) => {
  const [result, setResult] = useState<ResourceSchedule[]>([]);

  const fetchData = useCallback(async () => {
    const [jobs, jobAllocations, activities, activitiesAllocations, resources] = await Promise.all([
      props.service.getJobs(),
      props.service.getJobAllocations(),
      props.service.getActivities(),
      props.service.getActivityAllocations(),
      props.service.getResources(),
    ]);

    const resourceSchedule = resources.map((resource): ResourceSchedule => {
      return {
        resourceName: resource.name,
        resourceId: resource.id,
        allocations: getResourceAllocation(jobs, jobAllocations, activities, activitiesAllocations, resource),
      };
    });
    setResult(resourceSchedule);
  }, [props.service]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SectionGroup>
      <SectionPanel>{JSON.stringify(result)} </SectionPanel>
    </SectionGroup>
  );
};
