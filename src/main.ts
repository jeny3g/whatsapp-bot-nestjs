import { NestFactory } from '@nestjs/core';
import { VenomBotConfig } from '@shared/infra/config/venom-bot.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const appService = app.get(VenomBotConfig);
  console.log(appService.init());
  // const appService = app.get(AppService);
  // console.log(appService.getHello());
  // init VenomBotConfig class
}
bootstrap();
