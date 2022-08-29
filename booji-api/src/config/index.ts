export default () => ({
  port: parseInt(process.env.PORT, 10),
  mysql: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
  esNode: `http://${process.env.ES_HOST}:${process.env.ES_PORT}`,
  kafkaBroker: process.env.KAFKA_BROKER,
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_CODE,
  },
  github: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  static: `http://${process.env.HOST}:${process.env.PORT}/static`,
});
