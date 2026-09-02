import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './students.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(id: string, name: string, email: string,role :string ) {
      const student = this.studentRepository.create({ id, name, email,role });
       this.studentRepository.save(student);
       return "Registration Successfull please login !"
  }
}