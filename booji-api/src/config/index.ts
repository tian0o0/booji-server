// import { ClientsModuleOptions } from "@nestjs/microservices";
// import { kafkaConfig } from "./kafka";

// export { KAFKA_MODULE_PROVIDER } from "./kafka";

// export const microserviceConfig: ClientsModuleOptions = [kafkaConfig];

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3333,
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  },
});
