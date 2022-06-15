import { Controller, Get, Inject } from "@nestjs/common";
// import {
//   Ctx,
//   EventPattern,
//   KafkaContext,
//   Payload,
// } from "@nestjs/microservices";
// import { WINSTON_MODULE_PROVIDER } from "nest-winston";
// import { Logger } from "winston";

@Controller()
export class AppController {
  @Get("health")
  async init() {
    return "ok";
  }
  // constructor() {
  // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  // this.init();
  // }

  // onModuleInit() {
  //   // topics
  //   // const requestPatterns = ["test"];
  //   // requestPatterns.forEach((pattern) => {
  //   //   this.client.subscribeToResponseOf(pattern);
  //   // });
  // }

  // return this.client.emit("test", { foo: "bar" });
  // @EventPattern("test")
  // async handleEntityCreated(
  //   @Payload() message: any,
  //   @Ctx() context: KafkaContext
  // ) {
  //   const originalMessage = context.getMessage();
  //   const response =
  //     `Receiving a new message from topic: medium.rocks: ` +
  //     JSON.stringify(originalMessage.value);
  //   console.log(response);
  //   return response;
  // }
}
