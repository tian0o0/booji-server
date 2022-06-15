require("module-alias/register");
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { ValidationPipe } from "@pipes/validation.pipe";
import { ApplicationModule } from "./app.module";

async function bootstrap() {
  const appOptions = {
    cors: true,
  };
  const app = await NestFactory.create(ApplicationModule, appOptions);

  // replace default logger with winston
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // app.setGlobalPrefix('booji/v1');
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle("Booji Server")
    .setDescription("联系我: xietian19941007@gmail.com")
    .setVersion("1.0")
    .setBasePath("api")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/docs", app, document);

  // app.connectMicroservice(kafkaConfig);
  // await app.startAllMicroservicesAsync();

  await app.listen(3333);
}
bootstrap();
