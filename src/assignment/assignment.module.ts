import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './assignment.entity';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { Classroom } from 'src/classroom/classroom.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment]), TypeOrmModule.forFeature([Classroom]), TypeOrmModule.forFeature([Enrollment]),SupabaseModule,AuthModule,ClassroomModule] ,
  controllers: [AssignmentController],
  providers: [AssignmentService]
})
export class AssignmentModule {}
