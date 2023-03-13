import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  club: String,
  category: String,
  county: String,
  eircode: String,
  placemarkid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
