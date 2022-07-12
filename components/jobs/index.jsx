/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Main from '../../layouts/main';
import Container from '../front_components/container';

import Hero from './components/hero';
import JobBlock from './components/jobBlock';

const Jobs = ({ jobs }) => (
  <Main>
    <Container>
      <Hero />
    </Container>
    <Container>
      <JobBlock jobs={jobs} />
    </Container>
  </Main>
);

Jobs.propTypes = {
  jobs: PropTypes.object.isRequired,
};

export default Jobs;
