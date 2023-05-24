const express = require('express');
const http = require('http');
const connectDB = require('./db/connectDB');
const routes = require('./routes/AllRoutes');
const errorHandler = require('./middleware/errorHandler');
const socketLogic = require('./socket/socketLogic');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/', routes);

// Use the error handler middleware
app.use(errorHandler);

// MongoDB connection
connectDB(process.env.MONGO_URI);

// Socket.IO connection
socketLogic(server);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
