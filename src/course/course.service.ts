import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository : Repository<Course>
    ){}



    async registerCourse(title:string , description:string, teacherId:string) :Promise<Course>{


const course = this.courseRepository.create({title , description,teachers:[{id:teacherId} as any]});
return this.courseRepository.save(course)
    }
}
