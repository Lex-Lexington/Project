import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './configs/configs.module';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [ConfigsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
