const Property = require('../models/Property');

const createProperty = async (req, res) => {
  const { title, place, area, bedrooms, bathrooms, nearby, price } = req.body;

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

  const createdProperty = await property.save();
  res.status(201).json(createdProperty);
};

const getProperties = async (req, res) => {
  const properties = await Property.find({});
  res.json(properties);
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
