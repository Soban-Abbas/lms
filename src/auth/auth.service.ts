import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { TeacherService } from 'src/teachers/teachers.service';
import { StudentService } from 'src/students/students.service';

@Injectable()
export class AuthService {
    constructor(
        private supabaseService: SupabaseService,
        private teacherService: TeacherService,
        private studentService: StudentService,
    ) {}

    async register(name: string, email: string, password: string, role) {
        const { data, error } = await this.supabaseService.client.auth.signUp({
            email,
            password,
            options: {
                data: { name, role }, // <-- role yahan save karo Supabase ke user_metadata mein
            },
        });

        if (error) {
            throw new ConflictException(error.message);
        }
        if (!data.user) {
            throw new ConflictException('User creation failed');
        }

        if (role === 'teacher') {
            return this.teacherService.createTeacher(data.user.id, name, email,role);
        } else {
            return this.studentService.createStudent(data.user.id, name, email,role);
        }
    }

    async login(email: string, password: string) {
        const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
            email,
            password,
        });
        console.log(data)
        if (error) {
            throw new ConflictException(error.message);
        }

        return{
            email: data.user.email,
            role: data.user.user_metadata.role, // <-- seedha metadata se milega, DB query nahi lagi
            access_token: data.session.access_token,
        } // { user, session } — session mein access_token (JWT) hota hai
    }
}