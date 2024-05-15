import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { PostgresConfigService } from './config/postgres.config.service';


@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService] 
    }),
    CacheModule.register({isGlobal: true, ttl: 10000}),     
  ],
})
export class AppModule {}
