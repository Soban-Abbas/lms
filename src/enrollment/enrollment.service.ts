import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { Repository } from 'typeorm';
import { Classroom } from 'src/classroom/classroom.entity';

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private enrollmentRepository: Repository<Enrollment>
        ,
        @InjectRepository(Classroom)
        private classroomRepository: Repository<Classroom>



    ) { }

    async joinclassRoom(joiningId, studentId): Promise<{ message: string, enrollmentId: string }> {


        const classroom = await this.classroomRepository.find({ where: { joiningCode: joiningId } })

        if (!classroom) {
            throw new NotFoundException("Classroom not found")

        }


        const studentRegister = await this.enrollmentRepository.find({
            where:
            {
                student: { id: studentId }, classroom: { id: classroom[0].id }
            }
        })

        if (studentRegister.length > 0) {
            throw new ConflictException("Already Registered")
        }

        const enrollment = this.enrollmentRepository.create({ student: { id: studentId }, classroom: { id: classroom[0].id } });


        await this.enrollmentRepository.save(enrollment)

        return {
            message: "Class Room joined",
            enrollmentId: enrollment.id
        }




    }

    async allEnrollments(studentId):Promise<Enrollment[]> {
        const enrollments = await this.enrollmentRepository.find({
            relations: {
                classroom: true,
            
            }
        })
        if(enrollments.length<1){
            throw new NotFoundException("No classroom found")
        }
        return enrollments
    }



}
