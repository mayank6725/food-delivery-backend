const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Starters', 'Main Course', 'Dessert', 'Beverage', 'Sides', 'Breads'],
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

// Define the address schema
const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: addressSchema,
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  menuItems: [menuItemSchema], // Array of menu items
  openingHours: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;