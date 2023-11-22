const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
require('./config/connection');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes prefix
app.use('/api/v1', userRoutes);


const port = process.env.PORT || 3030;
app.listen(port, ()=>{
    console.log(`listening to: http://localhost:${port}`)
})
