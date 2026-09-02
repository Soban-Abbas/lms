import { Teacher } from 'src/teachers/teachers.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,ManyToMany,JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Assignment } from 'src/assignment/assignment.entity';
@Entity()
export class Classroom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({unique:true})
    joiningCode : string
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=>Teacher,(teachers)=>teachers.classrooms)
    teacher:Teacher;

    @OneToMany(() => Assignment, (assignment) => assignment.classroom)
    assignments: Assignment[];

}