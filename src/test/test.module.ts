import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { BullModule } from '@nestjs/bullmq';
import { UsersModule } from 'src/modules/user/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    UsersModule, AuthModule, ConfigModule.forRoot({isGlobal: true}), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'gugan',
      password: 'root',
      database: 'ecommerce_test',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: true,
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: {
        attempts: 3,
      },
      prefix: 'bullmq',
    }),
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
      max: 1000,
      ttl: 60000,
      socket: {
        host: 'localhost',
        port: 6379,
      },
      prefix: 'cache',
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
})
export class AppTestModule {}