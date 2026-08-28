import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { ClassroomService } from './classroom.service';
import { classroomController } from './classroom.controller';

import { AuthModule } from 'src/auth/auth.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
@Module({
    imports: [TypeOrmModule.forFeature([Classroom]), SupabaseModule, AuthModule],
    providers: [ClassroomService],
    controllers: [classroomController],
    
})
export class ClassroomModule { }

