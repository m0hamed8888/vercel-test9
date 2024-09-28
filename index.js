const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbURI = 'mongodb://localhost:27017/contactFormDB';


const app = express();
const PORT = 8000 || process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

// Schema and Model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// POST route to save contact data
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.json({ message: 'Contact saved successfully!' });
});

// GET route to retrieve all contact data
app.get('/api/contacts', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
