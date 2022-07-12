/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Link from 'next/link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Checkbox from '../myCheckBox';

export const ListingQuickView = ({ children }) => <Box>{children}</Box>;

ListingQuickView.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ListingQuickViewHeader = ({ job, form, children }) => {
  const jobForm = job || form;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      flexDirection={{ xs: 'column', sm: 'row' }}
    >
      <Box>
        <Typography fontWeight={700} variant="h4" gutterBottom>
          {jobForm.jobTitle}
        </Typography>
        <Typography variant="h6">
          {jobForm.workType === 'Work From Home'
            ? 'Anywhere'
            : `${jobForm.city}, ${jobForm.state}`}{' '}
          - {jobForm.job}
        </Typography>
      </Box>
      <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
        {/* Buttons go here */}
        {children}
      </Box>
    </Box>
  );
};

ListingQuickViewHeader.propTypes = {
  job: PropTypes.object,
  form: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export const ListingQuickViewBody = ({
  edit,
  form,
  business,
  job,
  children,
  search,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const jobForm = job || form;
  const jobBusiness = search ? job.business[0] : business;

  return (
    <Grid container spacing={isMd ? 4 : 2}>
      <Grid item xs={12} md={8}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Who we are
          </Typography>
          <Typography component="p">{jobBusiness.bio}</Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            What we’re looking for
          </Typography>
          <Typography component="p" sx={{ mb: '1em' }}>
            {!edit ? (
              jobForm.description
            ) : (
              <TextField
                fullWidth
                id="description"
                label="Job Description"
                variant="outlined"
                multiline
                minRows={2}
                value={jobForm.description ?? ''}
                name="description"
              />
            )}
          </Typography>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

ListingQuickViewBody.propTypes = {
  edit: PropTypes.bool,
  form: PropTypes.object,
  business: PropTypes.object,
  job: PropTypes.object,
  children: PropTypes.node.isRequired,
  search: PropTypes.bool,
};

export const ListingQuickViewList = ({
  responsibilities,
  qualifications,
  job,
  title,
}) => {
  const jobArray =
    job && title === 'Primary Responsibilities'
      ? job.responsibilities
      : job && title === 'Qualifications'
      ? job.qualifications
      : null;
  const resQualArray = responsibilities || qualifications;
  const lists = job ? jobArray : resQualArray;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: '1em' }}>
        {title}
      </Typography>
      <Stack direction="column" spacing={2}>
        {lists.map((list) => (
          <Box
            component={ListItem}
            disableGutters
            width="auto"
            padding={0}
            key={list.length}
          >
            <Checkbox />
            <Typography component="p" sx={{ ml: '1em' }}>
              {title === 'Primary Responsibilities' || responsibilities
                ? list.responsibility
                : title === 'Qualifications' || qualifications
                ? list.qualification
                : null}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

ListingQuickViewList.propTypes = {
  responsibilities: PropTypes.array,
  qualifications: PropTypes.array,
  job: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export const ListingQuickViewButton = ({
  edit,
  setEdit,
  children,
  link,
  variant = 'contained',
}) => {
  const editListing = () => setEdit(true);
  const done = () => setEdit(false);

  return (
    <>
      {link ? (
        <Link href={link} passHref>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            color="primary"
            size="large"
            onClick={
              edit === true ? done() : edit === false ? editListing : null
            }
          >
            {children}
          </Button>
        </Link>
      ) : (
        <Button
          variant={variant}
          sx={{ mr: 2 }}
          color="primary"
          size="large"
          onClick={edit === true ? done() : edit === false ? editListing : null}
        >
          {children}
        </Button>
      )}
    </>
  );
};

ListingQuickViewButton.propTypes = {
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
  variant: PropTypes.string,
};
