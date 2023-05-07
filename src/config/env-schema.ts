import * as Joi from 'joi';

export const envSchema = Joi.object({
  STAGE: Joi.string().required(),
  API_HOST: Joi.string().required(),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  PGADMIN_DEFAULT_EMAIL: Joi.string(),
  PGADMIN_DEFAULT_PASSWORD: Joi.string(),
});
