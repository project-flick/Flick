const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const dbURI = 'mongodb+srv://ryan:arafeh123@flick.6cx9yrs.mongodb.net/?retryWrites=true&w=majority&appName=Flick'; // replace with your MongoDB URI
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  // Import routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const authRoutes = require('./routes/auth');
const likeRoutes = require('./routes/like');
const notificationRoutes = require('./routes/notification');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/notifications', notificationRoutes);

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server running on port ${port}`));