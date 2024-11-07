const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schemas/schema');
const resolvers = require('./resolvers/resolvers');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const startServer = async () => {
  const app = express();

  // Add a basic ping route
  app.get('/ping', (req, res) => {
    res.send('Server is active');
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null;
      console.log('auth', auth);
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        );
        const currentUser = await User.findById(decodedToken.id);
        console.log('currentUser', currentUser);
        return { currentUser };
      }
    }
  });

  await server.start();
  server.applyMiddleware({ app });

  connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();