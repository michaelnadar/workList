// routes/todoRoutes.js
const express = require('express');
require('dotenv').config();
const { getToDoListsByUserId,createWorkList,updateWorkList ,deleteSingleWorkList} = require('../controllers/workListController');
const { register ,login} = require('../controllers/userController');
const verifyToken = require('./middleware/auth');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('../models'); // 👈 Import models and DB connection
const cors = require('cors');
app.use(cors());

// (optional) if you want to allow credentials too:
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running!');
});

app.get('/worklist',verifyToken, getToDoListsByUserId);
app.post('/worklist',verifyToken, createWorkList);
app.put('/worklist/:id',verifyToken, updateWorkList);
app.delete('/worklist/:id',verifyToken, deleteSingleWorkList);
app.post('/register', register);
app.post('/login', login);

// Start server after DB connection
db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });
