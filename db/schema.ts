import mongoose, { Schema } from "mongoose";
// db;
const productSchema = new Schema({
  name: String,
  price: String,
  link: String,
  images: [
    {
      data: { type: Buffer, required: false },
      contentType: { type: String, required: false },
      link: { type: String, required: false },
    },
  ],
  categories: [String],
  shortDisc: [{ name: String, about: String }],
  longDisc: { title: String, about: String },
});
const product = mongoose.model("products", productSchema);

export { product };
