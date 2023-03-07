const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Check out the `createdAt` field below. This is set up to use Mongo's automatic document
* expiration service by giving the Mongoose schema the `expires` property.
* After 30 seconds, the session will automatically be removed from the collection!
* (actually, Mongo's cleanup service only runs once per minute so the session
* could last up to 90 seconds before it's deleted, but still pretty cool!)
*/
const boardSchema = new Schema({
  boardName: { type: String, required: true, unique: true },
  columns: [
    {
      columnName: { type: String, required: true, unique: true },
      cards: [
        {
          cardText: { type: String, required: true, unique: true }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('boards', boardSchema);