import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // konfigurasi is global untuk semua module
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { typeOrmConfig } = await import('../config/typeorm.config');
        return typeOrmConfig;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
