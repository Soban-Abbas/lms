import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './assignment.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AssignmentService {

constructor(
@InjectRepository(Assignment) private assignmentRepository:Repository<Assignment>,
private supabaseService :SupabaseService

){}





    async createAssignment(
        title: string,
        description: string,
        teacherId: string,
        classroomId: string,
        file: Express.Multer.File,
    ) {
        const filePath = `${classroomId}/${Date.now()}-${file.originalname}`;

        const fileUrl = await this.supabaseService.uploadFile(
            'assignments',
            filePath,
            file.buffer,
            file.mimetype,
        );

        const assignment = this.assignmentRepository.create({
            title,
            description,
            fileUrl,
            teacher: { id: teacherId } as any,
            classroom: { id: classroomId } as any,
        });

        return this.assignmentRepository.save(assignment);
    }
}
