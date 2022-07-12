/* eslint-disable object-shorthand */
import dbConnect from '../../../lib/dbConnect';
import Job from '../../../models/Job';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const {
    job,
    city,
    state,
    salary,
    benefits,
    workType,
    description,
    hourlyRate,
    travel,
    jobTitle,
    freelanceType,
    businessID,
    responsibilities,
    qualifications,
  } = req.body;

  const newJob = {
    job: job,
    city: city,
    state: state,
    salary: salary,
    benefits: benefits,
    workType: workType,
    description: description,
    hourlyRate: hourlyRate,
    travel: travel,
    jobTitle: jobTitle,
    freelanceType: freelanceType,
    businessID: businessID,
    responsibilities: responsibilities,
    qualifications: qualifications,
  };

  switch (method) {
    case 'GET':
      try {
        const jobs = await Job.find({});

        res.status(200).json({ success: true, data: jobs });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const newJobPost = await Job.create(newJob);

        res.status(200).json({ success: true, data: newJobPost });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
