import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teachers.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacher(id: string, name: string, email: string,role :string ) {
    const teacher = this.teacherRepository.create({ id, name, email,role });
  this.teacherRepository.save(teacher);
  return "Registration successfull please login !"
  }
}