const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { setMpesaRoutes } = require('./routes/mpesaRoutes');
const { setEmailRoutes } = require('./routes/emailRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
setMpesaRoutes(app);
setEmailRoutes(app);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});