const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  bio: String,
  address: String,
  state: String,
  city: String,
  firstName: String,
  lastName: String,
  phone: String,
  industry: String,
  yearsInBusiness: String,
  employees: String,
  site: String,
  cover: String,
  avatar: String,
  verifyEmail: String,
  emailVerified: Boolean,
  jobs: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
});

module.exports =
  mongoose.models.Business || mongoose.model('Business', BusinessSchema);
