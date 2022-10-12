const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name is too short. Minimum is 3 letters.'],
    required: [true, 'Name is missing.'],
  },
  number: {
    type: String,
    minLength: [8, 'Phone number is too short. Minimum 8 numbers.'],
    match: [/\d{2,3}-\d{7,8}/, 'Not a valid phone number format.'],
    required: [true, 'User phone number required'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
