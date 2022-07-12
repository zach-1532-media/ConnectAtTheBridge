/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import { React, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import SaveIcon from '@mui/icons-material/Save';

import EditBusinessFields from './components/editBusinessFields';

const EditDetailsCard = ({
  title,
  subtitle,
  data,
  business,
  setOpenSuccess,
  setOpenBackdrop,
  setGeneralError,
}) => {
  const [form, setForm] = useState({
    businessName: data.businessName,
    site: data.site,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    bio: data.bio,
    industry: data.industry,
    yearsInBusiness: data.yearsInBusiness,
    employees: data.employees,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const updateInfo = async () => {
    try {
      const updateUserInfo = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      };
      const response = await fetch(`/api/business/${data._id}`, updateUserInfo);
      const editData = await response.json();
      if (editData.status === 200) {
        setIsSubmitting(false);
        setOpenBackdrop(false);
        setOpenSuccess(true);
        router.reload();
      } else if (editData.status === 400) {
        setIsSubmitting(false);
        setOpenBackdrop(false);
        setGeneralError(true);
      }
    } catch (err) {
      setIsSubmitting(false);
      setOpenBackdrop(false);
      setGeneralError(true);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        setOpenBackdrop(true);
        updateInfo();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const validate = () => {
    const err = {};
    const regEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    ).test(form.email);

    if (!form.businessName) {
      err.businessName = 'Company name is required';
    }
    if (!form.email) {
      err.email = 'Email is required';
    }
    if (!regEmail) {
      err.regEmail = 'Please enter a valid email address';
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmitting(true);
  };
  return (
    <Card>
      <Box
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle2">{subtitle}</Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
      <Divider />

      <CardContent
        sx={{
          p: 4,
        }}
      >
        {business ? (
          <EditBusinessFields form={form} setForm={setForm} errors={errors} />
        ) : null}
      </CardContent>
    </Card>
  );
};

EditDetailsCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  business: PropTypes.bool,
  setOpenBackdrop: PropTypes.func.isRequired,
  setOpenSuccess: PropTypes.func.isRequired,
  setGeneralError: PropTypes.func.isRequired,
};

EditDetailsCard.defaultProps = {
  business: false,
};

export default EditDetailsCard;