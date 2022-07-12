const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  bio: String,
  city: String,
  state: String,
  newsletter: Boolean,
  salary: String,
  workType: String,
  hourlyRate: String,
  travel: Boolean,
  benefits: Boolean,
  job: String,
  banking: Boolean,
  engineering: Boolean,
  computerScience: Boolean,
  insurance: Boolean,
  security: Boolean,
  food: Boolean,
  photography: Boolean,
  videography: Boolean,
  writingBlog: Boolean,
  dJ: Boolean,
  socialMedia: Boolean,
  digitalMarketing: Boolean,
  verifyEmail: String,
  emailVerified: Boolean,
  profileImage: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
