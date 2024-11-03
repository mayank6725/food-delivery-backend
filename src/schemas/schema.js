const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
  }
  
  type Restaurant {
    id: ID!
    name: String!
    address: Address!
    phone: String!
    email: String!
    menuItems: [MenuItem!]!
    openingHours: String
    rating: Float
  }

  type MenuItem {
    id: ID!
    name: String!
    description: String!
    price: Float!
    imageUrl: String
  }

  type Token {
    value: String!
  }
  
  enum PaymentMethod {
    CreditCard
    DebitCard
    Cash
    UPI
  }

  # Input type for OrderItem
  input OrderItemInput {
    id: ID!
    name: String!
    quantity: Int!
    price: Float!
  }

  # Input type for Address
  input AddressInput {
    street: String!
    city: String!
    state: String!
    pincode: String!
  }

  # Output type for Order
  type Order {
    customer: ID!
    restaurant: ID!
    orderItems: [OrderItem!]!
    totalPrice: Float!
    deliveryAddress: Address
    status: String!
    user: User!
  }

  # Address type for returning data
  type Address {
    street: String!
    city: String!
    state: String!
    pincode: String!
  }

  # OrderItem type for returning data
  type OrderItem {
    menuItem: ID!
    name: String!
    quantity: Int!
    price: Float!
  }

  type Query {
    restaurants: [Restaurant!]!
    searchRestaurantsByName(name: String!): [Restaurant!]! 
    restaurant(id: ID!): Restaurant
    orders(userId: ID!): [Order!]!
    me: User
  }

  type Mutation {
    createOrder(
      userId: ID!, 
      restaurantId: ID!, 
      items: [OrderItemInput!]!,
      deliveryAddress: AddressInput!,
      paymentMethod: PaymentMethod!
    ): Order
    register(username: String!, password: String!, role: String!): User
    login(username: String!, password: String!, role: String!): Token
  }
`;

module.exports = typeDefs;
