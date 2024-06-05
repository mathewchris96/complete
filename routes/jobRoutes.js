const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User'); // Added to use User model
const compatibilityModel = require('../models/compatibilityModel'); // Added to use compatibilityModel for score calculation
const { requireAuth, alreadyLoggedIn} = require('./middleware/authMiddleware');

router.get('/jobpost', (req, res) => {
  res.render('jobpost.ejs');
});

router.post('/jobpost', requireAuth, async (req, res) => {
  try {
    const { companyName, role, domain, location, skillsRequired, natureOfWork, jobPostingLink } = req.body;
    const job = new Job({ companyName, role, domain, location, skillsRequired, natureOfWork, jobPosting? resolveLink : null});
    await job.save();
    res.redirect('/');
  } catch (error) {
    console.error(`Failed to post job: ${error}`);
    res.status(500).json({ message: 'Failed to post job', error: error.message });
  }
});

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.render('jobListing.ejs', { jobs });
  } catch (error) {
    console.error(`Failed to fetch jobs: ${error}`);
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
});

// New route for compatibility assessment
router.post('/checkCompatibility', requireAuth, async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    const user = await User.findById(userId);
    const job = await Job.findById(jobId);
    if (!user || !job) {
      return res.status(404).json({ message: 'User or Job not found' });
    }
    const score = compatibilityModel.calculateCompatibility(user, job);
    res.json({ compatibilityScore: score });
  } catch (error) {
    console.error(`Failed to check compatibility: ${error}`);
    res.status(500).json({ message: 'Failed to check compatibility', error: error.message });
  }
});

module.exports = router;
```