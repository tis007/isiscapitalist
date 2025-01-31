import {NestFactory} from "@nestjs/core";
import {NestExpressApplication} from "@nestjs/platform-express";
import {AppModule} from "./app.module";
import {join} from "path";

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {logger: ['log', 'debug', 'error', 'verbose', 'warn']});
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();