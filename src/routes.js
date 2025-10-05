import express from 'express'; 
import bodyParser from 'body-parser';
import { handleComment } from './bot.js';
// import storage from './commands/storage'; // Person B will implement storage functions
import { getAllPinpoints, addPinpoint, editPinpoint, deletePinpoint, getPinpoint, listPinpoint} from './commands/handlers/index.js';

const router = express.Router();

// Middleware to parse JSON
//router.use(bodyParser.json());
router.use(express.json({ limit: '10mb' }));
router.use(express.urlencoded({ extended: true, limit: '10mb' }));


// ------------------------
// Webhook endpoint from GitHub
// ------------------------
router.post('/webhook', async (req, res) => {
  try {
    const payload = req.body;
    await handleComment(payload);
    res.status(200).json({ message: 'Webhook processed successfully.' });
  } catch (err) {
    console.error('Error in /webhook:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ------------------------
// GET all pinpoints
// ------------------------
router.get('/pinpoints', async (req, res) => {
  try {
    const pinpoints = await getAllPinpoints();
    res.status(200).json(pinpoints);
  } catch (err) {
    console.error('Error in GET /pinpoints:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ------------------------
// POST new pinpoint
// ------------------------
router.post('/pinpoints', async (req, res) => {
  try {
    const { keyword, value, user, source } = req.body;
    const result = await addPinpoint({ keyword, value, user, source });
    res.status(201).json({ message: '✅ Pinpoint added successfully.', data: result });
  } catch (err) {
    console.error('Error in POST /pinpoints:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ------------------------
// PUT update pinpoint by ID
// ------------------------
router.put('/pinpoints/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const result = await editPinpoint(id, value);
    res.status(200).json({ message: '✅ Pinpoint updated successfully.', data: result });
  } catch (err) {
    console.error('Error in PUT /pinpoints/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ------------------------
// DELETE pinpoint by ID
// ------------------------
router.delete('/pinpoints/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedId = await deletePinpoint(id);
    res.status(200).json({ message: '🗑️ Pinpoint deleted successfully.', deletedId });
  } catch (err) {
    console.error('Error in DELETE /pinpoints/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ------------------------
// GET search pinpoints by keyword
// ------------------------
router.get('/pinpoints/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    const results = await getPinpoints(keyword);
    if (results.length === 0) {
      res.status(404).json({ results: [], message: `❌ No pinpoint found for keyword: ${keyword}` });
    } else {
      res.status(200).json({ results });
    }
  } catch (err) {
    console.error('Error in GET /pinpoints/search:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
