import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './config';
import { validateConfig } from './config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [...configurations],
      envFilePath: ['.env', '.env.local'],
      validate: validateConfig,
    }),
  ],
})
export class ConfigsModule {}
