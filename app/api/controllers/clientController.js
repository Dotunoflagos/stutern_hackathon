const Client = require('../models/clientModel');
const validateBody = require('../utils/reqBodyValidator').validateWithSchema;
const registerSchema = require('../utils/joiValidationSchema/user').register;


// create client logic
exports.create = async (req, res) => {
  try {
    // Validate request body against the Joi schema
    // const error = validateBody(registerSchema, req.body);

    // if (error) {
    //   return res.status(400).json({ message: error });
    // }

    const userId = req.userId;
    const { firstname, lastname, email, phone, address } = req.body;

    // Check if the username already exists
    await Client.deleteOne({ email });
    const existingClient = await Client.findOne({
      firstname,
      lastname,
      email,
      phone
    });
    if (existingClient) {
      return res.status(409).json({ message: 'Client already exists' });
    }

    // Check if the email already exists
    const existingEmail = await Client.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Generate a random OTP
    // const otp = generateOTP();

    const newClient = new Client({
      userId,
      firstname,
      lastname,
      email,
      phone,
      address
    });

    const savedClient = await newClient.save();

    // Send the OTP to the user's email
    // sendOTP(email, otp);

    res.status(201).json({
      message: 'Client creation successful.',
      user: {
        _id: savedClient._id,
        userid: savedClient.userId,
        firstname: savedClient.firstname,
        lastname: savedClient.lastname,
        email: savedClient.email,
        phone: savedClient.phone,
        address: savedClient.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update client logic
exports.update = async (req, res) => {
  try {
    const userId = req.userId;
    const { clientId } = req.params; // ClientId in the URL params
    const { firstname, lastname, email, phone, address } = req.body;

    // Find the client by ID and check if it belongs to the logged-in user
    const existingClient = await Client.findOne({
      _id: clientId,
      userId: userId
    });

    if (!existingClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Update client details
    existingClient.firstname = firstname || existingClient.firstname;
    existingClient.lastname = lastname || existingClient.lastname;
    existingClient.email = email || existingClient.email;
    existingClient.phone = phone || existingClient.phone;
    existingClient.address = address || existingClient.address;

    // Save updated client details
    const updatedClient = await existingClient.save();

    res.status(200).json({
      message: 'Client details updated.',
      user: {
        _id: updatedClient._id,
        // userId: updatedClient.userId,
        firstname: updatedClient.firstname,
        lastname: updatedClient.lastname,
        email: updatedClient.email,
        phone: updatedClient.phone,
        address: updatedClient.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete client logic
exports.delete = async (req, res) => {
  try {
    const userId = req.userId;
    const { clientId } = req.params; // clientId passed in the URL params

    console.log(userId, clientId)
    // Find the client by ID and check if it belongs to the logged-in user
    const existingClient = await Client.findOne({
      _id: clientId,
      userId: userId
    });

    if (!existingClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Delete the client
    await existingClient.deleteOne();

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all clients endpoint
exports.getAll = async (req, res) => {
  try {
    const userId = req.userId; // userId associated with the logged-in user

    // Fetch all clients belonging to the logged-in user
    const allClients = await Client.find({ userId });

    if (!allClients || allClients.length === 0) {
      return res.status(404).json({ message: 'No clients found' });
    }

    // Map the clients to a simplified array of objects
    const clientsArray = allClients.map(client => ({
      _id: client._id,
      // userId: client.userId,
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      phone: client.phone,
      address: client.address,
    }));

    res.status(200).json(clientsArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search clients endpoint
exports.search = async (req, res) => {
  try {
    const { name, email, phone } = req.query;
    const userId = req.userId; // userId associated with the logged-in user

    // empty object to hold search criteria
    const searchCriteria = { userId };

    // Add search criteria
    if (name) {
      const nameRegex = new RegExp(name, 'i'); // Case-insensitive regex search for name
      searchCriteria.$or = [
        { firstname: nameRegex }, // Match documents with firstName matching name
        { lastname: nameRegex }   // Match documents with lastName matching name
      ];
    }
    if (email) {
      searchCriteria.email = new RegExp(email, 'i'); // Case-insensitive regex search for email
    }
    if (phone) {
      searchCriteria.phone = new RegExp(phone, 'i'); // Case-insensitive regex search for phone
    }

    console.log(searchCriteria)
    // Find clients based on search criteria
    const foundClients = await Client.find(searchCriteria);

    if (!foundClients || foundClients.length === 0) {
      return res.status(404).json({ message: 'No clients found' });
    }

    const clientsArray = foundClients.map(client => ({
      _id: client._id,
      // userId: client.userId,
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      phone: client.phone,
      address: client.address,
    }));

    res.status(200).json(clientsArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
