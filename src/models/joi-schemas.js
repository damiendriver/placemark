import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const PlaceSpec = {
  club: Joi.string().required(),
  category: Joi.string().required(),
  county: Joi.string().required(),
  eircode: Joi.string().required(),
};

export const PlacemarkSpec = {
  title: Joi.string().required(),
};