import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mainShema = new Schema({
  shortUrl: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
});

const Link = mongoose.model('Link', mainShema);

export default Link;