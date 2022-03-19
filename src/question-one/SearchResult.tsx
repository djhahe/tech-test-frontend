import React from 'react';
import { Job, Contact } from '../common/types';
import Spinner from '../components/Spinner';

interface searchResultProps {
  isLoading?: boolean;
  searchResult: (Pick<Job, 'name' | 'start' | 'end'> & { contact: Contact })[];
}

export const SearchResult: React.FC<searchResultProps> = (props) => {
  const { isLoading, searchResult } = props;
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {searchResult.length ? (
            searchResult.map(({ name, start, end, contact }, index: number) => {
              return (
                <div key={name}>
                  <h2>Job {index + 1}</h2>
                  <table>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{name}</td>
                      </tr>
                      <tr>
                        <td>Start</td>
                        <td>{start}</td>
                      </tr>
                      <tr>
                        <td>End</td>
                        <td>{end}</td>
                      </tr>
                      <tr>
                        <td>Contact</td>
                        <td>{contact.name}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })
          ) : (
            <h2>No job found</h2>
          )}
        </div>
      )}
    </>
  );
};
