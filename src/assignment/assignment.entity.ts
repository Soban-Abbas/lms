import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Teacher } from 'src/teachers/teachers.entity';
import { Classroom } from 'src/classroom/classroom.entity';

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    fileUrl: string; // Supabase Storage se mila hua file link

    @Column({ nullable: true })
    dueDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Teacher)
    teacher: Teacher;

    @ManyToOne(() => Classroom)
    classroom: Classroom;
}