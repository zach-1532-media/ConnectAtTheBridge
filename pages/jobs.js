/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../lib/dbConnect';
import Job from '../models/Job';

import Jobs from '../components/jobs';

const JobPage = ({ jobs }) => <Jobs jobs={jobs} />;

export async function getServerSideProps() {
  await dbConnect();
  // eslint-disable-next-line global-require
  require('../models/Business');

  const jobs = await Job.aggregate().lookup({
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

JobPage.propTypes = {
  jobs: PropTypes.array.isRequired,
};

export default JobPage;
