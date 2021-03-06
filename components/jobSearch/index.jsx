/* eslint-disable object-shorthand */
/* eslint-disable react/forbid-prop-types */
import { React, useState } from 'react';

import PropTypes from 'prop-types';

import Main from '../../layouts/main';

import Container from '../front_components/container';

import Hero from './components/hero';
import JobBlock from './components/jobBlock';

const JobSearch = ({ jobs }) => {
  const [search, setSearch] = useState('');

  return (
    <Main>
      <Container>
        <Hero search={search} setSearch={setSearch} />
      </Container>
      <Container>
        <JobBlock jobs={jobs} search={search} />
      </Container>
    </Main>
  );
};

JobSearch.propTypes = {
  jobs: PropTypes.array.isRequired,
};

export default JobSearch;
