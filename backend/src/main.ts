import {NestFactory} from "@nestjs/core";
import {NestExpressApplication} from "@nestjs/platform-express";
import {AppModule} from "./app.module";
import {join} from "path";

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {logger: ['log', 'debug', 'error', 'verbose', 'warn']});
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();