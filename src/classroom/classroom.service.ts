import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { Repository, } from 'typeorm';
import { randomBytes } from 'crypto';
import { Enrollment } from 'src/enrollment/enrollment.entity';
import { Assignment } from 'src/assignment/assignment.entity';
@Injectable()
export class ClassroomService {
    constructor(
        @InjectRepository(Classroom)
        private classroomRepository: Repository<Classroom>
        ,
        @InjectRepository(Enrollment)
        private enrollmentRepository: Repository<Enrollment>,

        @InjectRepository(Assignment)
        private assignmentsRepository: Repository<Assignment>
    ) {}



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

    async getClassroom(id:string,role:string){


if(role==="teacher"){
    const classrooms =  await this.classroomRepository.find({where:{teacher:{id:id}}, select:{
        id:true,
        title:true,
        description:true,
        joiningCode:true,
        createdAt:true
    }})

    const classroomwithAssignments=await Promise.all(classrooms.map(async(classroom)=>{
const assignments= await this.assignmentsRepository.find({where:{classroom:{id:classroom.id}},select:{
    id:true,
    title:true,
    description:true,
    fileUrl:true,
    dueDate:true,
    createdAt:true
}})
return {
    classroom,
    assignments
}



    }))
    
    return classroomwithAssignments
}

const classroomsEnrollments= await this.enrollmentRepository.find({where:{student:{id:id}},relations:{classroom:{assignments:true,teacher:true}},select:{
    classroom:{
        title:true,
        description:true,
        teacher:{
            name:true,
            email:true
        },
        assignments:{
            id:true,
            title:true,
            description:true,
            dueDate:true,
            fileUrl:true
        }
    }
}})
     
        if (classroomsEnrollments.length<1){
            throw new NotFoundException("No Classrooms founds")

        }

    

        classroomsEnrollments.forEach((enrollments)=>{
enrollments.classroom.assignments=enrollments.classroom.assignments.filter((assign)=>{
    return new Date(assign.dueDate)>new Date()
})
        })

return classroomsEnrollments

}
}
