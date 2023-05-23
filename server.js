const express = require('express');
const connectDB = require('./db/connectDB');
const routes = require('./routes/AllRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();


const app = express();


// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use the routes
app.use('/', routes);

// Use the error handler middleware
app.use(errorHandler);

// MongoDB connection
connectDB(process.env.MONGO_URI);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
