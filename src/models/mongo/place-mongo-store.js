import { Place } from "./place.js";

export const placeMongoStore = {
    async getAllPlaces() {
    const places = await Place.find({ placemarkid: id }).lean();
    return places;
  },

  async addPlace(placemarkId, place) {
    place.placemarkid = placemarkId;
    const newPlace = new Place(place);
    const placeObj = await newPlace.save();
    return this.getPlaceById(placeObj._id);
  },

  async getPlacesByPlacemarkId(id) {
    const places = await Place.find({ placemarkid: id }).lean();
    return places;
  },

  async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).lean();
      return place;
    }
    return null;
  },

  async deletePlace(id) {
    try {
      await Place.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaces() {
    await Place.deleteMany({});
  },

  async updatePlace(place, updatedPlace) {
    const placeDoc = await Place.findOne({ _id: place._id });
    placeDoc.club = updatedPlace.club;
    placeDoc.category = updatedPlace.category;
    placeDoc.county = updatedPlace.county;
    placeDoc.eircode = updatedPlace.eircode;
    await placeDoc.save();
  },
}; 
