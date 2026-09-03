import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from 'src/assignment/assignment.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';
import { Repository } from 'typeorm';
import { Submission } from './submission.entity';
import { Classroom } from 'src/classroom/classroom.entity';
import { SupabaseService } from 'src/supabase/supabase.service';
import { NotFoundException,ForbiddenException } from '@nestjs/common';
@Injectable()
export class SubmissionService {



constructor(@InjectRepository(Assignment) private assignmentRepository:Repository<Assignment>,
    @InjectRepository(Enrollment) private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Submission) private submissionRepository: Repository<Submission>,
    @InjectRepository(Classroom)
            private classroomRepository: Repository<Classroom>,

                  private supabaseService:SupabaseService,
){}



    async submitAssignment(assignmentId: string, studentId: string, file: Express.Multer.File) {
        
        const assignment = await this.assignmentRepository.findOne({
            where: { id: assignmentId },
            relations: { classroom: true },
        });


        if (!assignment) {
            throw new NotFoundException('Assignment not found');
        }

        
        const classroomId = assignment.classroom.id;

        const alreadySubmited= await this.submissionRepository.findOne({where:{student:{id:studentId },assignment:{id:assignmentId}}})

        if(alreadySubmited){
            throw new ConflictException("Assignment Already Submited")
        }
        
        const enrollment = await this.enrollmentRepository.findOne({
            where: {
                student: { id: studentId },
                classroom: { id: classroomId },
            },
        });

        
        if (!enrollment) {
            throw new ForbiddenException('You are not enrolled in this classroom');
        }

        
        const filePath = `submissions/${assignmentId}/${studentId}-${Date.now()}-${file.originalname}`;
        const fileUrl = await this.supabaseService.uploadFile(
            'submissions',
            filePath,
            file.buffer,
            file.mimetype,
        );

        
        const submission = this.submissionRepository.create({
            fileUrl,
            submittedAt:new Date(),
            student: { id: studentId } as any,
            assignment: { id: assignmentId } as any,
        });

         this.submissionRepository.save(submission);
         return{
            message:"assignment uploaded "
         }
    }


     async getSolvedAssignments(classroomId: string, userId: string, role: string) {
            if (role === 'teacher') {
                // Step 1: Verify — kya ye teacher isi classroom ka owner hai?
                const classroom = await this.classroomRepository.findOne({
                    where: { id: classroomId },
                    relations: { teacher: true },
                });

                if (!classroom) {
                    throw new NotFoundException('Classroom not found');
                }

                if (classroom.teacher.id !== userId) {
                    throw new ForbiddenException('You are not the teacher of this classroom');
                }

                // Step 2: Teacher hai to saari submissions do
                return this.submissionRepository.find({
                    where: { assignment: { classroom: { id: classroomId } } },
                    relations: { assignment: true, student: true },
                });
            }

            if (role === 'student') {
                // Step 1: Verify — kya ye student is classroom mein enrolled hai?
                const enrollment = await this.enrollmentRepository.findOne({
                    where: {
                        student: { id: userId },
                        classroom: { id: classroomId },
                    },
                });

                if (!enrollment) {
                    throw new ForbiddenException('You are not enrolled in this classroom');
                }

                // Step 2: Enrolled hai to apni submissions do
                return this.submissionRepository.find({
                    where: {
                        assignment: { classroom: { id: classroomId } },
                        student: { id: userId },
                    },
                    relations: { assignment: true },
                });
            }
        }
    }




