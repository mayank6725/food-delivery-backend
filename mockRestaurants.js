const mongoose = require('mongoose');
const Restaurant = require('./src/models/Restaurant'); // Import the Restaurant model
require('dotenv').config();

const mockRestaurants = [
  {
    name: 'Biryani Palace',
    address: {
      street: '1 Spice Lane',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    },
    phone: '011-1234-5678',
    email: 'info@biryanipalace.com',
    menuItems: [
      {
        name: 'Chicken Biryani',
        price: 199.99,
        description: 'Fragrant basmati rice with marinated chicken and spices.',
        category: 'Main Course',
      },
      {
        name: 'Raita',
        price: 49.99,
        description: 'Yogurt with cucumber and spices.',
        category: 'Sides',
      },
    ],
    openingHours: '10:00 AM - 11:00 PM',
    rating: 4.7,
  },
  {
    name: 'Curry Nation',
    address: {
      street: '45 Curry Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
    phone: '022-2345-6789',
    email: 'contact@currynation.com',
    menuItems: [
      {
        name: 'Paneer Butter Masala',
        price: 150.99,
        description: 'Paneer cooked in a rich butter gravy.',
        category: 'Main Course',
      },
      {
        name: 'Garlic Naan',
        price: 35.99,
        description: 'Soft flatbread with garlic and butter.',
        category: 'Breads',
      },
    ],
    openingHours: '11:00 AM - 10:30 PM',
    rating: 4.5,
  },
  {
    name: 'Dosa Delight',
    address: {
      street: '77 Idli Street',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
    },
    phone: '080-3456-7890',
    email: 'hello@dosadelight.com',
    menuItems: [
      {
        name: 'Masala Dosa',
        price: 89.99,
        description: 'Crispy dosa filled with spiced potatoes.',
        category: 'Main Course',
      },
      {
        name: 'Sambar',
        price: 29.99,
        description: 'Lentil-based vegetable stew.',
        category: 'Sides',
      },
    ],
    openingHours: '8:00 AM - 10:00 PM',
    rating: 4.8,
  },
  {
    name: 'Tandoori Nights',
    address: {
      street: '99 Grill Street',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500001',
    },
    phone: '040-4567-8901',
    email: 'info@tandoorinights.com',
    menuItems: [
      {
        name: 'Tandoori Chicken',
        price: 249.99,
        description: 'Marinated chicken cooked in a tandoor.',
        category: 'Main Course',
      },
      {
        name: 'Onion Salad',
        price: 20.99,
        description: 'Sliced onions with lemon.',
        category: 'Sides',
      },
    ],
    openingHours: '12:00 PM - 11:00 PM',
    rating: 4.6,
  },
  {
    name: 'Sweet Treats',
    address: {
      street: '11 Dessert Lane',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
    },
    phone: '0141-5678-1234',
    email: 'contact@sweettreats.com',
    menuItems: [
      {
        name: 'Gulab Jamun',
        price: 49.99,
        description: 'Fried dough balls soaked in sugar syrup.',
        category: 'Dessert',
      },
      {
        name: 'Ras Malai',
        price: 59.99,
        description: 'Soft cheese balls in creamy milk.',
        category: 'Dessert',
      },
    ],
    openingHours: '10:00 AM - 10:00 PM',
    rating: 4.9,
  },
  {
    name: 'The Noodle Bowl',
    address: {
      street: '32 Noodle St',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001',
    },
    phone: '044-6789-1234',
    email: 'info@noodlebowl.com',
    menuItems: [
      {
        name: 'Veg Hakka Noodles',
        price: 119.99,
        description: 'Stir-fried noodles with mixed vegetables.',
        category: 'Main Course',
      },
      {
        name: 'Spring Rolls',
        price: 60.99,
        description: 'Crispy rolls filled with veggies.',
        category: 'Starters',
      },
    ],
    openingHours: '11:00 AM - 11:00 PM',
    rating: 4.4,
  },
  {
    name: 'Thali House',
    address: {
      street: '8 Meal Plaza',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    },
    phone: '020-7890-1234',
    email: 'info@thalihouse.com',
    menuItems: [
      {
        name: 'Thali',
        price: 199.99,
        description: 'A complete meal served on a platter.',
        category: 'Main Course',
      },
      {
        name: 'Papad',
        price: 20.99,
        description: 'Crispy lentil crackers.',
        category: 'Sides',
      },
    ],
    openingHours: '12:00 PM - 10:00 PM',
    rating: 4.5,
  },
  {
    name: 'Chat Corner',
    address: {
      street: '123 Snack St',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380001',
    },
    phone: '079-8901-2345',
    email: 'contact@chatcorner.com',
    menuItems: [
      {
        name: 'Pani Puri',
        price: 49.99,
        description: 'Crispy puris filled with spiced water.',
        category: 'Starters',
      },
      {
        name: 'Bhel Puri',
        price: 39.99,
        description: 'Puffed rice with vegetables and tangy sauce.',
        category: 'Starters',
      },
    ],
    openingHours: '4:00 PM - 10:00 PM',
    rating: 4.3,
  },
  {
    name: 'Café Chai',
    address: {
      street: '10 Tea Lane',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700001',
    },
    phone: '033-1234-5678',
    email: 'info@cafechai.com',
    menuItems: [
      {
        name: 'Masala Chai',
        price: 20.99,
        description: 'Spiced tea served with biscuits.',
        category: 'Beverage',
      },
      {
        name: 'Samosa',
        price: 25.99,
        description: 'Crispy pastry filled with spiced potatoes.',
        category: 'Starters',
      },
    ],
    openingHours: '8:00 AM - 10:00 PM',
    rating: 4.6,
  },
  {
    name: 'Grill & Chill',
    address: {
      street: '7 BBQ Road',
      city: 'Surat',
      state: 'Gujarat',
      pincode: '395001',
    },
    phone: '0261-3456-7890',
    email: 'info@grillchill.com',
    menuItems: [
      {
        name: 'Paneer Tikka',
        price: 199.99,
        description: 'Grilled paneer cubes marinated in spices.',
        category: 'Starters',
      },
      {
        name: 'Tandoori Roti',
        price: 20.99,
        description: 'Whole wheat flatbread cooked in a tandoor.',
        category: 'Breads',
      },
    ],
    openingHours: '5:00 PM - 11:00 PM',
    rating: 4.7,
  },
];

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return Restaurant.insertMany(mockRestaurants);
  })
  .then(() => {
    console.log('Mock restaurants added successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Failed to add mock data:', err);
  });
