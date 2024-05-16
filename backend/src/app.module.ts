import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
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
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 })
      }),
      isGlobal: true
    }),     
  ],
})
export class AppModule {}
