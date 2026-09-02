import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './assignment.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ClassroomService } from 'src/classroom/classroom.service';
import { Classroom } from 'src/classroom/classroom.entity';
import { NotFoundError } from 'rxjs';
import { Enrollment } from 'src/enrollment/enrollment.entity';

@Injectable()
export class AssignmentService {

constructor(
@InjectRepository(Assignment) private assignmentRepository:Repository<Assignment>,
private supabaseService :SupabaseService,
@InjectRepository(Classroom) private classroomRepository : Repository<Classroom>,

@InjectRepository(Enrollment) private        enrollmentRepository:Repository<Enrollment>
){}
    async createAssignment(
        title: string,
        description: string,
        dueDate:string ,
        teacherId: string,
        classroomId: string,
        file?: Express.Multer.File,
    ) {
        let fileUrl :string  | undefined;
        if(file){
            const filePath = `${classroomId}/${Date.now()}-${file.originalname}`;

             fileUrl = await this.supabaseService.uploadFile(
                'assignments',
                filePath,
                file.buffer,
                file.mimetype,
            );




        }
    

     

        const assignment = this.assignmentRepository.create({
            title,
            description,
         
            fileUrl,

            dueDate: new Date(dueDate),
            teacher: { id: teacherId } as any,
            classroom: { id: classroomId } as any,
        });

     this.assignmentRepository.save(assignment);
     return {
id:assignment.id,
title:assignment.title,
description:assignment.description,
dueDate:assignment.dueDate,
fileUrl:assignment.fileUrl
     }
    }



    async getallAssignments(userId, role,classroomId){
    const classroom=await  this.classroomRepository.find({where:{id:classroomId} , relations:{teacher:true}})
    if(classroom.length<1){
        throw new NotFoundException("classroom not found")
    }
  const authenticTeacher :boolean = classroom[0].teacher.id===userId;

  if(role==='teacher' && !authenticTeacher){
throw new NotFoundException("classroom not found")

  }
        
  if(role==='student'){
     let  isStudentEnrolled = await this.enrollmentRepository.find({ where: { student: { id:userId} ,classroom:{id:classroomId} } })


     if(isStudentEnrolled.length<1){
        throw new NotFoundException("classroom not found")
     }

    }

const assignment= await this.assignmentRepository.find({where:{classroom:{id:classroomId}}, select:{
    id:true,
    title:true,
    description:true,
    dueDate:true,
    fileUrl:true
}})

if( !assignment || assignment.length<1){
    throw new NotFoundException("no assignment uploaded")
}
return assignment

  }

    }


