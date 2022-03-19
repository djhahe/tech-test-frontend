import { Job, JobAllocations, Activity, ActivityAllocations, Resource, Allocation } from '../common/types';

/**
 * Given a resource and a list of activities, return a list of allocations for the resource
 * @param {Resource} resource - The resource that we want to get the allocations for.
 * @param {Activity[]} activities - The list of activities that are being allocated to the resource.
 * @param {ActivityAllocations[]} ActivityAllocations - An array of activity allocations.
 * @returns An array of allocations.
 */
const getActivityAllocationsByResource = (
  resource: Resource,
  activities: Activity[],
  ActivityAllocations: ActivityAllocations[],
): Allocation[] => {
  const filteredActivityAllocation = ActivityAllocations.filter((value) => value.resourceId === resource.id);
  return filteredActivityAllocation.map((value): Allocation => {
    const activity = activities.find((act) => value.activityId === act.id) || { name: '', start: '', end: '' };
    return { allocType: 'activity', name: activity.name, start: activity.start, end: activity.end };
  });
};

/**
 * Given a resource and a list of job allocations, return a list of allocations for the jobs
 * @param {Resource} resource - The resource that we want to get the allocations for.
 * @param {Job[]} jobs - The list of jobs that are being scheduled.
 * @param {JobAllocations[]} jobAllocations - JobAllocations[]
 * @returns An array of allocations.
 */
const getJobAllocationByResource = (
  resource: Resource,
  jobs: Job[],
  jobAllocations: JobAllocations[],
): Allocation[] => {
  const filteredJobAllocation = jobAllocations.filter((value) => value.resourceId === resource.id);
  return filteredJobAllocation.map((value): Allocation => {
    const job = jobs.find((job) => value.jobId === job.id) || { name: '', start: '', end: '' };
    return { allocType: 'job', name: job.name, start: job.start, end: job.end };
  });
};

/**
 * It returns all the allocations for a given resource
 * @param {Job[]} jobs - The list of jobs that are being scheduled.
 * @param {JobAllocations[]} jobAllocations - JobAllocations[]
 * @param {Activity[]} activities - An array of activities.
 * @param {ActivityAllocations[]} activitiesAllocations - An array of activity allocations.
 * @param {Resource} resource - Resource
 * @returns An array of allocations.
 */
export const getResourceAllocation = (
  jobs: Job[],
  jobAllocations: JobAllocations[],
  activities: Activity[],
  activitiesAllocations: ActivityAllocations[],
  resource: Resource,
): Allocation[] => {
  return [
    ...getActivityAllocationsByResource(resource, activities, activitiesAllocations),
    ...getJobAllocationByResource(resource, jobs, jobAllocations),
  ];
};
