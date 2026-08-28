import { Classroom } from "src/classroom/classroom.entity";
import { Student } from "src/students/students.entity";
import { Column,PrimaryGeneratedColumn,Entity, ManyToOne, CreateDateColumn } from "typeorm";

@Entity()
export class Enrollment{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ManyToOne(()=>Student)
    student:Student;

    @ManyToOne(()=>Classroom)
    classroom:Classroom;


    @CreateDateColumn()
    joiningDate: Date;
}