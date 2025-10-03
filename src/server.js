// const express = require('express');
import express from 'express'; 
import dotenv from 'dotenv'; 
import routes from './routes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Mount routes
app.use('/', routes);

app.get('/', (req, res) => {
  res.send("Pinpoint api running"); 
})

// Start server
app.listen(PORT, () => {
  console.log(`✅ Pinpoint server running on http://localhost:${PORT}`);
});
