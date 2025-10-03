const fs = require('fs');
const path = require('path');
const dataFile = path.join(__dirname, '../../data/pinpoints.json');

// Helper: read JSON file
function readData() {
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]');
  const json = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(json);
}

// Helper: write JSON file
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Add new pinpoint
async function addPinpoint({ keyword, value, user, source }) {
  const data = readData();
  const newEntry = {
    id: 'p' + (data.length + 1),
    keyword,
    value,
    user,
    source,
    timestamp: new Date().toISOString()
  };
  data.push(newEntry);
  writeData(data);
  return newEntry;
}

// Get all pinpoints
async function getAllPinpoints() {
  return readData();
}

// Update pinpoint by ID
async function updatePinpoint(id, value) {
  const data = readData();
  const entry = data.find(p => p.id === id);
  if (!entry) throw new Error('Pinpoint not found');
  entry.value = value;
  entry.timestamp = new Date().toISOString();
  writeData(data);
  return entry;
}

// Delete pinpoint by ID
async function deletePinpoint(id) {
  let data = readData();
  const index = data.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Pinpoint not found');
  const deleted = data.splice(index, 1)[0];
  writeData(data);
  return deleted.id;
}

// Search pinpoints by keyword
async function searchPinpoints(keyword) {
  const data = readData();
  return data.filter(p => p.keyword.toLowerCase().includes(keyword.toLowerCase()));
}

module.exports = {
  addPinpoint,
  getAllPinpoints,
  updatePinpoint,
  deletePinpoint,
  searchPinpoints
};
