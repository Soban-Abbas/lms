import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


import { SupabaseModule } from 'src/supabase/supabase.module';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';


@Module({
  imports:[SupabaseModule,TeachersModule,StudentsModule],
  controllers: [AuthController],
  providers: [AuthService,JwtAuthGuard,RolesGuard],
  exports:[JwtAuthGuard,AuthService,RolesGuard]
})
export class AuthModule {}
