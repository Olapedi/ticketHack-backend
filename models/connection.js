const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://lpiegad22:O3jgWMsbyUDrj5eU@cluster0.ocgfjil.mongodb.net/ticketHack';
mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
.then(() => console.log('Database connected'))  
.catch(error => console.error(error));
