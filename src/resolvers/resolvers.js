const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    restaurants: async () => await Restaurant.find(),
    restaurant: async (_, { id }) => await Restaurant.findById(id),
    orders: async (_, { userId }) => await Order.find({ customer: userId }),
    searchRestaurantsByName: async (_, { name }) => {
      return await Restaurant.find({ name: { $regex: name, $options: 'i' } });
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    createOrder: async (_, { userId, restaurantId, items, deliveryAddress, paymentMethod }) => {
      const orderItems = items.map(item => ({
        menuItem: item.id, 
        name: item.name,
        quantity: item.quantity,
        price: item.price, 
      }));
    
      // Calculate total price
      const totalPrice = calculateTotal(orderItems); 

      const order = new Order({
        customer: userId, 
        restaurant: restaurantId, 
        orderItems, 
        totalPrice, 
        status: 'Pending', 
        deliveryAddress, 
        paymentMethod, 
      });
    
      await order.save();
    
      return order;
    },
    register: async (_, { username, password, role }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, role });
      await user.save();
      return user;
    },
    login: async (_, { username, password, role }) => {
      // Find the user by username and role
      const user = await User.findOne({ username, role });
      if (!user) {
        throw new Error('No such user found!');
      }
    
      // Compare the plain text password with the hashed password in the DB
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }
    
      // Generate a JWT token upon successful login
      const userForToken = {
        username: user.username,
        id: user._id,
        role: user.role,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
    
  },
};

function calculateTotal(items) {
  return 0;
}

module.exports = resolvers;