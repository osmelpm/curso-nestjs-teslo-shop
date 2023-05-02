export default () => ({
  server_port: +process.env.SERVER_PORT,
  db_host: process.env.DB_HOST,
  db_port: +process.env.POSTGRES_PORT,
  db_password: process.env.POSTGRES_PASSWORD,
  db_user: process.env.POSTGRES_USER,
  db_name: process.env.POSTGRES_DB,
});
