import { Module, } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module'; 
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true 
  }), EventsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
