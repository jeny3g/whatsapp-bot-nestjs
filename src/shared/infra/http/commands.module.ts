import { ChatGptUseCase } from '@application/use-cases/chat-gpt-use-case';
import { DalleUseCase } from '@application/use-cases/dalle-use-case';
import { Module } from '@nestjs/common';
import { VenomBotConfig } from '../config/venom-bot.config';

@Module({
  providers: [ChatGptUseCase, DalleUseCase, VenomBotConfig],
})
export class CommandsModule {}
