import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { Repository, } from 'typeorm';

@Injectable()
export class ClassroomService {
    constructor(
        @InjectRepository(Classroom)
        private classroomRepository: Repository<Classroom>
    ) { }



    async registerClassroom(title: string, description: string, teacherId: string): Promise<Classroom> {


        const classroom = this.classroomRepository.create({ title, description, teacher: { id: teacherId } as any });
        return this.classroomRepository.save(classroom)
    }

    async getClassroom(id:string):Promise<Classroom[]>{
return this.classroomRepository.find({relations:{teacher:true}, select:{id:true,title:true,description:true,
    createdAt:true,
    teacher:{name:true,email:true}
}})
    }




}
