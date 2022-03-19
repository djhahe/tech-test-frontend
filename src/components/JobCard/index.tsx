import React from 'react';
import { Job, JobAllocations } from '../../common/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import './JobCard.scss';

dayjs.extend(utc);
interface JobItemProps {
  item: Job & { jobAllocations: JobAllocations[] };
  index: number;
}

const DATE_FORMAT = 'ddd MMM DD YYYY';
const TIME_FORMAT = 'HH:mm';

const JobCard: React.FC<JobItemProps> = ({ item, index }) => {
  return (
    <div className="job__section">
      <div className="job__section__content">
        <div className="job__title title">
          {item.name} <span className="sub__title">(Job #{index})</span>
          <div className="sub__title">{item.location}</div>
        </div>
        <div className="job__datetime flex">
          <div>
            <div className="sub__title">{dayjs.utc(item.start).format(DATE_FORMAT)}</div>
            <div className="sub__title bold">{`${dayjs.utc(item.start).format(TIME_FORMAT)} - ${dayjs
              .utc(item.end)
              .format(TIME_FORMAT)}`}</div>
          </div>
          {item.jobAllocations.length > 0 && <div className="job_resources">{item.jobAllocations.length}</div>}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
