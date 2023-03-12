import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data = { places: [] };

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(placemarkId, place) {
    await db.read();
    place._id = v4();
    place.placemarkid = placemarkId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlacesByPlacemarkId(id) {
    await db.read();
    return db.data.places.filter((place) => place.placemarkid === id);
  },

  async getPlaceById(id) {
    await db.read();
    return db.data.places.find((place) => place._id === id);
  },

  async deletePlace(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },

  async updatePlace(place, updatedPlace) {
    place.club = updatedPlace.club;
    place.category = updatedPlace.category;
    place.county = updatedPlace.county;
    place.eircode = updatedPlace.eircode;
    await db.write();
  },

};
