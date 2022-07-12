/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { React, useState } from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';

import ActivePosts from './components/ActivePosts';
import InactivePosts from './components/InactivePosts';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      component="span"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PostedJobs = ({ jobs, business }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ mt: '2em' }}>
      <Box marginBottom={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="h2" fontWeight={600} gutterBottom>
            Your Posted Jobs
          </Typography>
          <Typography variant="body1" gutterBottom fontWeight={500}>
            Toggle between your active and inactive posted jobs.
          </Typography>
        </Box>
        <Divider sx={{ mb: '2em', mt: '2em' }} />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab disableRipple label="Active Posts" {...a11yProps(0)} />
            <Tab disableRipple label="Inactive Posts" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <ActivePosts jobs={jobs} business={business} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InactivePosts jobs={jobs} business={business} />
      </TabPanel>
    </Container>
  );
};

PostedJobs.propTypes = {
  jobs: PropTypes.array.isRequired,
  business: PropTypes.object.isRequired,
};

export default PostedJobs;
