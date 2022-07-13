/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../../lib/dbConnect';
import Job from '../../models/Job';

import JobSearch from '../../components/jobSearch';

const JobSearchDynamicPage = ({ jobs }) => <JobSearch jobs={jobs} />;

export async function getServerSideProps({ query: { search } }) {
  await dbConnect();
  // eslint-disable-next-line global-require
  require('../../models/Business');

  const jobs = !search
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
            query: search,
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

  const jobsReverse = jobs.reverse();

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobsReverse)),
    },
  };
}

JobSearchDynamicPage.propTypes = {
  jobs: PropTypes.array.isRequired,
};

export default JobSearchDynamicPage;
