import * as dotenv from 'dotenv';

import { BaseCommand } from '@application/repositories/base-command';
import { Injectable } from '@nestjs/common';
import { openai } from '@shared/infra/config/openai.config';
import { CreateImageRequest } from 'openai';
import { Whatsapp } from 'venom-bot';

dotenv.config();

@Injectable()
export class DalleUseCase extends BaseCommand {
  public async run(client: Whatsapp, message: any) {
    const imgDescription = message.text.substring(message.text.indexOf(' '));

    await this.getDalleResponse(imgDescription).then((imgUrl) => {
      client.sendImage(
        message.from === process.env.BOT_NUMBER ? message.to : message.from,
        imgUrl,
        imgDescription,
        'Imagem gerada pela IA DALL-E 🤖',
      );
    });
  }

  private getDalleResponse = async (clientText: string) => {
    const options = {
      prompt: clientText, // Descrição da imagem
      n: 1, // Número de imagens a serem geradas
      size: '1024x1024', // Tamanho da imagem
    } as CreateImageRequest;

    try {
      const response = await openai.createImage(options);
      return response.data.data[0].url;
    } catch (e) {
      return `❌ OpenAI Response Error: ${e.response.data.error.message}`;
    }
  };
}
