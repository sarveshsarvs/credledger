const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Credential = require('./models/Credential');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Test root route
app.get('/', (req, res) => {
  res.send('SkillChain Backend Running!');
});

// Test User creation route
app.post('/test-user', async (req, res) => {
  try {
    const { name, email, role, did } = req.body;
    const user = new User({ name, email, role, did });
    await user.save();
    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test Credential creation route
app.post('/test-credential', async (req, res) => {
  try {
    const { title, description, issuedToId, issuedById } = req.body;

    const issuedTo = await User.findById(issuedToId);
    const issuedBy = await User.findById(issuedById);

    if (!issuedTo || !issuedBy) return res.status(404).json({ error: 'User not found' });

    const credential = new Credential({
      title,
      description,
      issuedTo: issuedTo._id,
      issuedBy: issuedBy._id,
    });

    await credential.save();
    res.json({ message: 'Credential created', credential });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
