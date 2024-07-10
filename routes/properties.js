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
const cors = require('./cors');
const router = express.Router();

router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, protect, createProperty)
.get(cors.cors, getProperties);

router.route('/myproperties')
.options( cors.corsWithOptions, (req,res)=>{res.statusCode=(200);})
.get(protect, getUserProperties);

router.route('/:id')
.options( cors.corsWithOptions, (req,res)=>{res.statusCode=(200);})
.put(cors.corsWithOptions, protect, updateProperty)
.delete(cors.corsWithOptions, protect, deleteProperty);

// Get seller details via property ID
router.route('/:id/seller')
.options( cors.corsWithOptions, (req,res)=>{res.statusCode=(200);})
.get(cors.cors, protect, getPropertySeller);


module.exports = router;
