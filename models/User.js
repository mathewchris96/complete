const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const otpGenerator = require('./otpGenerator');
const EmailService = require('./EmailService');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  domainOfInterest: {
    type: String,
  },
  linkedinUrl: {
    type: String,
    trim: true,
  },
  currentCompany: {
    type: String,
    trim: true,
  },
  currentLevel: {
    type: String,
    required: true,
  },
  jobsAppliedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }],
  otp: {
    value: String,
    expiresAt: Date,
  },
});

// Hashing the password before saving it to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare the password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Comparing password failed');
  }
};

userSchema.methods.generateOtp = async function() {
  const otpValue = otpGenerator.generate(); // Assuming generate() is the method to generate OTP
  this.otp = {
    value: otpValue,
    expiresAt: new Date(Date.now() + 300000), // OTP expires in 5 minutes
  };
  await this.save(); // Save the user with the OTP
};

userSchema.methods.sendOtpEmail = async function() {
  if (!this.otp || !this.email) return;
  try {
    await EmailService.sendEmail({
      to: this.email,
      subject: 'Your OTP',
      text: `Your OTP is ${this.otp.value} and it expires in 5 minutes.`,
    });
  } catch (error) {
    throw new Error('Sending OTP email failed');
  }
};

userSchema.index({'otp.value': 1});

module.exports = mongoose.model('User', userSchema);
```