const { Schema, model } = require('mongoose');

// Make schema = Bouncer at the club

const bookmarkSchema = new Schema({
  title: { type: String, required: true, unique: true },
  body: String,
})


module.exports = model('Bookmark', bookmarkSchema )
