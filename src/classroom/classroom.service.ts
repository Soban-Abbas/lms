import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { Repository, } from 'typeorm';
import { randomBytes } from 'crypto';
@Injectable()
export class ClassroomService {
    constructor(
        @InjectRepository(Classroom)
        private classroomRepository: Repository<Classroom>
    ) { }



    async registerClassroom(title: string, description: string, teacherId: string): Promise<{message:string , id:string , title : string , joiningCode:string}> {

const joiningCode=randomBytes(3).toString('hex').toUpperCase()
        const classroom = this.classroomRepository.create({ title, description,joiningCode, teacher: { id: teacherId } as any });
         this.classroomRepository.save(classroom)
         return {
            message:"classroom created",
           id : classroom.id,
           title :classroom.title,
           joiningCode:classroom.joiningCode

         }
    }

    async getClassroom(id:string):Promise<Classroom[]>{
return this.classroomRepository.find({relations:{teacher:true}, select:{id:true,title:true,description:true,joiningCode:true,
    createdAt:true,
    teacher:{name:true,email:true}
}})
    }




}
