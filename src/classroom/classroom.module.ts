import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { ClassroomService } from './classroom.service';
import { classroomController } from './classroom.controller';

import { AuthModule } from 'src/auth/auth.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { Enrollment } from 'src/enrollment/enrollment.entity';
import { Assignment } from 'src/assignment/assignment.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Classroom]), TypeOrmModule.forFeature([Assignment]),TypeOrmModule.forFeature([Enrollment]), SupabaseModule, AuthModule],
    providers: [ClassroomService],
    controllers: [classroomController],
    exports:[ClassroomService]
})
export class ClassroomModule { }

