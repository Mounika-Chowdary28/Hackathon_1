const express = require('express');
const router = express.Router();
const {
  createIssue,
  getIssues,
  getIssue,
  updateIssueStatus,
  deleteIssue,
  getNearbyIssues,
  getIssueStats
} = require('../controllers/issueController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes (require authentication)
router.post('/', protect, upload.single('image'), createIssue);
router.get('/', protect, getIssues);
router.get('/nearby/:longitude/:latitude/:distance', protect, getNearbyIssues);

// Admin only routes (must be before /:id to avoid conflicts)
router.get('/admin/stats', protect, admin, getIssueStats);
router.put('/:id/status', protect, admin, updateIssueStatus);

// Dynamic routes (must be last)
router.get('/:id', protect, getIssue);
router.delete('/:id', protect, deleteIssue);

module.exports = router;
