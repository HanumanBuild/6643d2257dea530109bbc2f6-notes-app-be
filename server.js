const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// START Import authentication routes
const authRoutes = require('./routes/authRoutes');
// END Import authentication routes

// START Use authentication routes
app.use('/api/auth', authRoutes);
// END Use authentication routes

// START Import notes routes
const noteRoutes = require('./routes/noteRoutes');
// END Import notes routes

// START Use notes routes
app.use('/api/notes', noteRoutes);
// END Use notes routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});