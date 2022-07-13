/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../../../../../lib/dbConnect';
import Business from '../../../../../models/Business';
import Job from '../../../../../models/Job';

import Dash from '../../../../../layouts/dash';
import PostedJobs from '../../../../../components/dash/business/PostedJobs';

const BusinessDash = ({ jobs, business }) => (
  <Dash business={business}>
    <PostedJobs jobs={jobs} business={business} />
  </Dash>
);

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  const businesses = await Business.findById(id);
  const jobs = await Job.find({ businessID: id });

  const jobsReverse = jobs.reverse();

  return {
    props: {
      business: JSON.parse(JSON.stringify(businesses)),
      jobs: JSON.parse(JSON.stringify(jobsReverse)),
    },
  };
}

BusinessDash.propTypes = {
  jobs: PropTypes.array.isRequired,
  business: PropTypes.object.isRequired,
};

export default BusinessDash;
