import { ChatGptUseCase } from '@application/use-cases/chat-gpt-use-case';
import { DalleUseCase } from '@application/use-cases/dalle-use-case';
import { Injectable } from '@nestjs/common';
import { create, Whatsapp } from 'venom-bot';

@Injectable()
export class VenomBotConfig {
  constructor(
    private readonly chatGptUseCase: ChatGptUseCase,
    private readonly dalleUseCase: DalleUseCase,
  ) {}

  public async init() {
    try {
      const client = await create({
        session: 'Chat-GPT',
        multidevice: true,
      });

      this.start(client);
    } catch (error) {
      console.log(error);
    }
  }

  private start(client: Whatsapp) {
    const commands = (client: Whatsapp, message: any) => {
      const iaCommands = {
        davinci3: '/bot',
        dalle: '/img',
      };

      const firstWord = message.text.substring(0, message.text.indexOf(' '));

      switch (firstWord) {
        case iaCommands.davinci3:
          this.chatGptUseCase.run(client, message);
          break;

        case iaCommands.dalle:
          this.dalleUseCase.run(client, message);
          break;
      }
    };

    client.onAnyMessage((message) => commands(client, message));
  }
}
