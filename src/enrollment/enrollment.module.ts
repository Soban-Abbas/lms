import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { Classroom } from 'src/classroom/classroom.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Enrollment,Classroom]),SupabaseModule,AuthModule],
  providers: [EnrollmentService],
  controllers: [EnrollmentController]
})
export class EnrollmentModule {}
