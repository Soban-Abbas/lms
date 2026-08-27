import { Teacher } from 'src/teachers/teachers.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,ManyToMany,JoinTable } from 'typeorm';

@Entity()
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => Teacher, (teacher) => teacher.courses)
    @JoinTable()
    teachers: Teacher[];
}