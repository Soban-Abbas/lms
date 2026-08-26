import { Module } from '@nestjs/common';
import { TeacherService } from './teachers.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teachers.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Teacher])],
  providers: [TeacherService],
  exports:[TeacherService]
})
export class TeachersModule {}
