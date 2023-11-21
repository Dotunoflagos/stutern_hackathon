const mongoose = require('mongoose');
require('dotenv').config()
const url = process.env.DB_URI;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('connected to Database succcessfully'))
.catch(err=>console.log('Error:', err.message ));