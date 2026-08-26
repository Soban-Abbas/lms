import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {  ConfigModule,ConfigService } from '@nestjs/config';
import { TeachersModule } from './teachers/teachers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';
import { StudentsModule } from './students/students.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Step 1: .env padho

    TypeOrmModule.forRootAsync({               // Step 2 & 3: connect karo
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('database_url'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: { rejectUnauthorized: false },
      }),
      
    }),
    TeachersModule,
    AuthModule,
    SupabaseModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
