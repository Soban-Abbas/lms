import { Teacher } from 'src/teachers/teachers.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,ManyToMany,JoinTable, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Classroom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=>Teacher,(teachers)=>teachers.classrooms)
    teacher:Teacher
}