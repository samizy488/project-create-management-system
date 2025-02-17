import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            useFactory: (configService: ConfigService) => (
                {
                    type: 'mysql',
                    host: configService.getOrThrow('DB_HOST'),
                    port: +configService.getOrThrow<number>('DB_PORT'),
                    username: configService.getOrThrow('DB_USER'),
                    password: configService.getOrThrow('DB_PASSWORD'),
                    database: configService.getOrThrow('DB_NAME'),
                    autoLoadEntities: true,
                    synchronize: true,
                }
            ),
            inject: [ConfigService]
        }),
    ]
})
export class DatabaseModule {}