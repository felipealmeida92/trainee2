import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestsModule } from './requests/requests.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, RequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
