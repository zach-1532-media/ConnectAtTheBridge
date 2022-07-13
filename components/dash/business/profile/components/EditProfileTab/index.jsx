/* eslint-disable react/forbid-prop-types */
import { React, useState } from 'react';

import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';

import { SuccessSnack, GeneralSnack } from '../../../../../shared/snackbars';
import DetailsCard from '../../../../../shared/detailsCard';
import EditDetailsCard from '../../../../../shared/editDetailsCard';

const EditProfileTab = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {!edit ? (
          <DetailsCard
            title="Business Details"
            subtitle="Manage Informaion related to your business."
            data={data}
            setEdit={setEdit}
            business
          />
        ) : (
          <EditDetailsCard
            title="Business Details"
            subtitle="Edit your details below"
            data={data}
            setEdit={setEdit}
            setGeneralError={setGeneralError}
            setOpenSuccess={setOpenSuccess}
            business
          />
        )}
      </Grid>
      <SuccessSnack
        message="edit"
        openSuccess={openSuccess}
        setOpenSuccess={setOpenSuccess}
      />
      <GeneralSnack
        generalError={generalError}
        setGeneralError={setGeneralError}
      />
    </Grid>
  );
};

EditProfileTab.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EditProfileTab;
