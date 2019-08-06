const mongoose = require('mongoose')
require('dotenv').config()

const connectDatabase = () => {
  const url = process.env.MONGODB_URI
  mongoose.connect(url, { useNewUrlParser: true })
};

module.exports = { connectDatabase }
