import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(placemarkId, place) {
    place._id = v4();
    place.placemarkid = placemarkId;
    places.push(place);
    return place;
  },

  async getPlacesByPlacemarkId(id) {
    return places.filter((place) => place.placemarkid === id);
  },

  async getPlaceById(id) {
    let u = places.find((place) => place._id === id);
    if (u === undefined) u = null;
    return u;
  },

  async getPlacemarkPlaces(placemarkId) {
    return places.filter((place) => place.placemarkid === placemarkId);
  },

  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    if (index !== -1) places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.club = updatedPlace.club;
    place.category = updatedPlace.category;
    place.county = updatedPlace.county;
    place.eircode = updatedPlace.eircode;
    return place;
  },

};
