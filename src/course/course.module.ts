import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

import { AuthModule } from 'src/auth/auth.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
@Module({
    imports:[TypeOrmModule.forFeature([Course]), SupabaseModule, AuthModule],
    providers: [CourseService],
    controllers: [CourseController]
})
export class CourseModule {}

