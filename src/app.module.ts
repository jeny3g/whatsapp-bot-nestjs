import { Module } from '@nestjs/common';
import { CommandsModule } from '@shared/infra/http/commands.module';

@Module({
  imports: [CommandsModule],
})
export class AppModule {}
