import { db } from "../models/db.js";
import { PlaceSpec } from "../models/joi-schemas.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Sport Grounds",
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },

  addPlace: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentPlacemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        return h.view("placemark-view", { title: "Add place error", placemark:currentPlacemark, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newPlace = {
        club: request.payload.club,
        category: request.payload.category,
        county: request.payload.county,
        eircode: request.payload.eircode,
      };
      await db.placeStore.addPlace(placemark._id, newPlace);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
  
  deletePlace: {
    handler: async function(request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

};