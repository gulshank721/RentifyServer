const Property = require('../models/Property');

const createProperty = async (req, res) => {
  const { title, place, area, bedrooms, bathrooms, nearby, price } = req.body;

  //creating new property document to be saved into collection
  const property = new Property({
    title,
    place,
    area,
    bedrooms,
    bathrooms,
    nearby,
    price,
    seller: req.user._id
  });

  const createdProperty = await property.save(); //saving it to the Property collection
  res.status(201).json(createdProperty);
};

const getProperties = async (req, res) => {
  const queryArea = req.query.searchArea;
  console.log(queryArea);
  let properties;
  try {
    if (queryArea) {
      
      const regex = new RegExp(queryArea, 'i'); // 'i' makes the search case-insensitive
      properties = await Property.find({ place: regex });
    } else {
      properties = await Property.find({});
    }
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

const getUserProperties = async (req, res) => {
  const properties = await Property.find({ seller: req.user._id });
  res.json(properties);
};

const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { title, place, area, bedrooms, bathrooms, nearby, price } = req.body;

  const property = await Property.findById(id);

  if (property) {
    property.title = title;
    property.place = place;
    property.area = area;
    property.bedrooms = bedrooms;
    property.bathrooms = bathrooms;
    property.nearby = nearby;
    property.price = price;

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } else {
    res.status(404).json({ message: 'Property not found' });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;

  const property = await Property.findById(id);

  if (property) {
    await property.deleteOne();
    res.json({ message: 'Property removed' });
  } else {
    res.status(404).json({ message: 'Property not found' });
  }
};

const getPropertySeller = async (req, res)=>{
    const property = await Property.findById(req.params.id).populate('seller', 'firstName lastName email phoneNumber');
  
    if (property) {
      res.json(property.seller);
    } else {
      res.status(404);
      throw new Error('Property not found');
    }
}

module.exports = {
  createProperty,
  getProperties,
  getUserProperties,
  updateProperty,
  deleteProperty,
  getPropertySeller
};
