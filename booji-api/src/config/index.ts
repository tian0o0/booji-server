export default () => ({
  port: parseInt(process.env.PORT, 10) || 3333,
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  },
  esNode: `http://${process.env.ES_HOST}:${process.env.ES_PORT}`,
  kafkaBrokers: [process.env.KAFKA_BROKER],
});
