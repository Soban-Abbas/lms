import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository, TreeRepository } from 'typeorm';

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



    async getCourse(query:any):Promise<Course[]>{
        
        const page :string = query.page? query.page:'1'
        const items : string = query.items? query.items:'5';
        const offset=(Number(page)-1)*Number (items)
        const data = await this.courseRepository.find({
            relations:{
                teachers:true
            },
            select:{
                id:true,
                title:true,
                description:true,
                createdAt:true,
                teachers:{
                    name:true,
                    email:true
                }
            }
            ,
            
        })
       
        return data
        
        
    }


}
