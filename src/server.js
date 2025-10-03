const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Mount routes
app.use('/', routes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Pinpoint server running on http://localhost:${PORT}`);
});
