/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Text from '../../../text';

const UserFields = ({ data }) => {
  const fields = [
    {
      field: 'Name',
      text: `${data.firstName ?? ''} ${data.lastName ?? ''}`,
    },
    {
      field: 'Email',
      text: `${data.email ?? ''}`,
    },
    {
      field: 'Address',
      text: `${data.address ?? ''}${data.address ? ',' : ''} ${
        data.city ?? ''
      }${data.city ? ',' : ''} ${data.state ?? ''}${data.state ? ',' : ''} ${
        data.zip ?? ''
      }`,
    },
    {
      field: 'Bio',
      text: `${data.bio ?? ''}`,
    },
    {
      field: 'Salary Preferences',
      text: `${data.salary ?? ''}`,
    },
    {
      field: 'Work Preferences',
      text: `${data.workType ?? ''}`,
    },
    {
      field: 'Travel?',
      text: `${data.travel ?? ''}`,
    },
    {
      field: 'Benefits?',
      text: `${data.benefits ?? ''}`,
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <Typography variant="subtitle2">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box sx={{ pr: 3, pb: 2 }}>{field.field}</Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>{field.text}</b>
              </Text>
            </Grid>
          </Grid>
        </Typography>
      ))}
    </>
  );
};

UserFields.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UserFields;
