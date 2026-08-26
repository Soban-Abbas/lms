import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


import { SupabaseModule } from 'src/supabase/supabase.module';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';


@Module({
  imports:[SupabaseModule,TeachersModule,StudentsModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
