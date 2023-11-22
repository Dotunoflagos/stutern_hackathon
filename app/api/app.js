const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const cors = require('cors');
app.use(cors())
require('dotenv').config();
require('./config/connection');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes prefix
app.use('/api/v1', userRoutes);
app.use('/api/v1', clientRoutes);
app.use('/api/v1', invoiceRoutes);


const port = process.env.PORT || 3030;
app.listen(port, ()=>{
    console.log(`listening to: http://localhost:${port}`)
})
