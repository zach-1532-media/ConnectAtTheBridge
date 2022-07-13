/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import { React, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@mui/material/styles';

import Backdrop from '../backdrop';
import EditBusinessFields from './components/editBusinessFields';
import EditUserFields from './components/editUserFields';

const EditDetailsCard = ({
  title,
  subtitle,
  data,
  business,
  setEdit,
  setOpenSuccess,
  setGeneralError,
}) => {
  const [businessForm, setBusinessForm] = useState({
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
  const [userForm, setUserForm] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    bio: data.bio,
    salary: data.salary,
    workType: data.workType,
    hourlyRate: data.workType,
    travel: data.travel,
    benefits: data.benefits,
  });
  const job = data.job ? data.job : [];
  const salary = data.salary ? data.salary : [];
  const hourlyRate = data.hourlyRate ? data.hourlyRate : [];
  const workType = data.workType ? data.workType : [];
  const [userJob, setUserJob] = useState(job);
  const [userSalary, setUserSalary] = useState(salary);
  const [userHourlyRate, setUserHourlyRate] = useState(hourlyRate);
  const [userWorkType, setUserWorkType] = useState(workType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [userErrors, setUserErrors] = useState({});
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const router = useRouter();

  const theme = useTheme();

  const updateInfo = async () => {
    try {
      const updateBusinessInfo = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessForm),
      };
      const response = await fetch(
        `/api/business/${data._id}`,
        updateBusinessInfo
      );
      const editData = await response.json();
      if (editData.status === 200) {
        setIsSubmitting(false);
        setOpenBackdrop(false);
        setOpenSuccess(true);
        router.replace(router.asPath);
        setEdit(false);
      } else if (editData.status === 400) {
        setIsSubmitting(false);
        setOpenBackdrop(false);
        setGeneralError(true);
        router.replace(router.asPath);
        setEdit(false);
      }
    } catch (err) {
      setIsSubmitting(false);
      setOpenBackdrop(false);
      setGeneralError(true);
      router.replace(router.asPath);
      setEdit(false);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
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
    ).test(businessForm.email);

    if (!businessForm.businessName) {
      err.businessName = 'Company name is required';
    }
    if (!businessForm.email) {
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
    setOpenBackdrop(true);
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
        <Stack direction="row" spacing={2}>
          <Button
            sx={{
              color: theme.colors.error.main,
              '&:hover': {
                background: theme.colors.error.lighter,
              },
            }}
            onClick={() => setEdit(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Stack>
      </Box>
      <Divider />

      <CardContent
        sx={{
          p: 4,
        }}
      >
        {business ? (
          <EditBusinessFields
            form={businessForm}
            setForm={setBusinessForm}
            errors={errors}
          />
        ) : (
          <EditUserFields
            userForm={userForm}
            setUserForm={setUserForm}
            userJob={userJob}
            setUserJob={setUserJob}
            userSalary={userSalary}
            setUserSalary={setUserSalary}
            userHourlyRate={userHourlyRate}
            setUserHourlyRate={setUserHourlyRate}
            userWorkType={userWorkType}
            setUserWorkType={setUserWorkType}
            userErrors={userErrors}
          />
        )}
      </CardContent>
      <Backdrop open={openBackdrop} />
    </Card>
  );
};

EditDetailsCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  business: PropTypes.bool,
  setEdit: PropTypes.func.isRequired,
  setOpenSuccess: PropTypes.func.isRequired,
  setGeneralError: PropTypes.func.isRequired,
};

EditDetailsCard.defaultProps = {
  business: false,
};

export default EditDetailsCard;
