import * as Joi from 'joi';

export const envSchema = Joi.object({
  SERVER_HOST: Joi.string().required(),
  SERVER_PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
  PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
});
