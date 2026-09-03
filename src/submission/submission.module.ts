import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from 'src/assignment/assignment.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';
import { Submission } from './submission.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { Classroom } from 'src/classroom/classroom.entity';

@Module({
  imports: [SupabaseModule,
    TypeOrmModule.forFeature([Assignment,Classroom, Enrollment, Submission]), 
    AuthModule,
    
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService]
})
export class SubmissionModule {}
