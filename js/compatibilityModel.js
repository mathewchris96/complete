// compatibilityModel.js

// Function to calculate compatibility between a user and a job
// Parameters changed from userProfile and jobDescription to user and job
function calculateCompatibility(user, job) {
  // Initial mock implementation returning a random compatibility score
  const score = Math.random() * 100;
  return score;
}

// Exporting the calculateCompatibility function to be used in jobRoutes.js
module.exports = { calculateCompatibility };