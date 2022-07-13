/* eslint-disable react/forbid-prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-filename-extension */
import { React, useState } from 'react';

import PropTypes from 'prop-types';

import dbConnect from '../../../../../lib/dbConnect';
import User from '../../../../../models/User';
import Job from '../../../../../models/Job';

import Hero from '../../../../../components/jobSearch/components/hero';
import Container from '../../../../../components/front_components/container';
import JobBlock from '../../../../../components/jobSearch/components/jobBlock';
import Dash from '../../../../../layouts/dash';

const ProfilePage = ({ user, jobs }) => {
  const [search, setSearch] = useState(' ');

  return (
    <Dash user={user} userPage>
      <Container>
        <Hero search={search} setSearch={setSearch} />
      </Container>
      <Container>
        <JobBlock jobs={jobs} search={search} />
      </Container>
    </Dash>
  );
};

export async function getServerSideProps({ query: { email, search } }) {
  await dbConnect();
  // eslint-disable-next-line global-require
  require('../../../../../models/Business');

  const user = await User.findOne({ email: email });

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
      user: JSON.parse(JSON.stringify(user)),
      jobs: JSON.parse(JSON.stringify(jobsReverse)),
    },
  };
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  jobs: PropTypes.array.isRequired,
};

export default ProfilePage;
