import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const placeApi = {
    find: {
        auth: false,
        handler: async function (request, h) {
          try {
            const places = await db.placeStore.getAllPlaces();
            return places;
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
        },
      },

  findOne: {
    auth: false,
    async handler(request) {
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
    },
  },
};
