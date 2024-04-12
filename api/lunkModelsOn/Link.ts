import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LinksSchema = new Schema({
  shortUrl: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
});

const Link = mongoose.model('Link', LinksSchema);

export default Link;