const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
//Use middleware like helmet in Express to set secure HTTP headers
const helmet = require('helmet');

const connectDB = require('./config/mongoDB')
const spillTeaStoryRoutes = require('./routes/storyRoutes');
const cabinlyRoutes = require('./routes/cabinlyRoutes')
const aiAssistantRoutes = require('./routes/aiAssistant')
const app = express()

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(helmet());


app.use('/api/v1/', spillTeaStoryRoutes, cabinlyRoutes, aiAssistantRoutes)

module.exports = app; 