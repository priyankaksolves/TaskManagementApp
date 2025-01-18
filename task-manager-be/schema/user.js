const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false }, // Optional field
  city: { type: String, required: false }, // Optional field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
