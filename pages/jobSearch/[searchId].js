/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../../lib/dbConnect';
import Job from '../../models/Job';

import JobSearch from '../../components/jobSearch';

const JobSearchDynamicPage = ({ jobs }) => <JobSearch jobs={jobs} />;

export async function getServerSideProps({ query: { searchId } }) {
  await dbConnect();
  // eslint-disable-next-line global-require
  require('../../models/Business');

  const jobs =
    searchId === 'all'
      ? await Job.aggregate().lookup({
          from: 'businesses',
          localField: 'businessID',
          foreignField: '_id',
          as: 'business',
        })
      : await Job.aggregate()
          .search({
            index: 'Job Search',
            text: {
              query: searchId,
              path: ['jobTitle', 'description'],
              fuzzy: {},
            },
          })
          .lookup({
            from: 'businesses',
            localField: 'businessID',
            foreignField: '_id',
            as: 'business',
          });

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
  };
}

JobSearchDynamicPage.propTypes = {
  jobs: PropTypes.array.isRequired,
};

export default JobSearchDynamicPage;
