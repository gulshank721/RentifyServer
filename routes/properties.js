const express = require('express');
const {
  createProperty,
  getProperties,
  getUserProperties,
  updateProperty,
  deleteProperty,
  getPropertySeller
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createProperty).get(getProperties);
router.route('/myproperties').get(protect, getUserProperties);
router.route('/:id').put(protect, updateProperty).delete(protect, deleteProperty);
// Get seller details via property ID
router.route('/:id/seller').get(protect, getPropertySeller);


module.exports = router;
