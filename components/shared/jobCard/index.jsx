/* eslint-disable react/forbid-prop-types */
import { React, useState } from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { JobCardSVG1, JobCardSVG2, modalStyle } from '../data';

const JobStepperCard = ({ job, isJobsPage, form, height, width, children }) => {
  const formJob = job || form;

  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let color;

  const blue = '#5271FF';
  const orange = '#ff813c';

  if (formJob.job === 'Full-Time') {
    color = blue;
  } else if (formJob.job === 'Part-Time') {
    color = orange;
  }

  return (
    <Box
      component={Card}
      width={width}
      height={height}
      data-aos={isJobsPage ? 'fade-up' : null}
      data-aos-offset={isJobsPage ? 100 : null}
      data-aos-duration={isJobsPage ? 600 : null}
      flexDirection="column"
      display="flex"
      sx={{
        '&:hover': {
          borderRight: `${theme.spacing(1 / 2)} solid ${color}`,
        },
      }}
    >
      <CardActionArea onClick={handleOpen}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              pt: 1 / 2,
              pb: 1 / 2,
              pl: 1,
              pr: 1,
              mb: 2,
              bgcolor: `${color}`,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              align="center"
              sx={{ color: theme.palette.common.white }}
            >
              {formJob.job}
            </Typography>
          </Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
            {formJob.jobTitle}
          </Typography>
          <Box display="flex" alignItems="center" marginY={1}>
            <JobCardSVG1 />
            <Typography variant="subtitle2" color="text.secondary">
              {formJob.workType === 'Work From Home'
                ? 'Anywhere'
                : `${formJob.city}, ${formJob.state}`}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <JobCardSVG2 />
            <Typography variant="subtitle2" color="text.secondary">
              {formJob.workType}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>{children}</Box>
      </Modal>
    </Box>
  );
};

JobStepperCard.propTypes = {
  job: PropTypes.object,
  isJobsPage: PropTypes.bool,
  form: PropTypes.object,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

JobStepperCard.defaultProps = {
  job: {},
  isJobsPage: false,
  form: {},
};

export default JobStepperCard;
