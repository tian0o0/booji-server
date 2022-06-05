import { ClientProviderOptions, Transport } from "@nestjs/microservices";

export const KAFKA_MODULE_PROVIDER = "kafka";

export const kafkaConfig: ClientProviderOptions = {
  name: KAFKA_MODULE_PROVIDER,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "booji",
      brokers: ["localhost:9092"],
    },
    consumer: {
      groupId: "booji-consumer",
    },
  },
};
