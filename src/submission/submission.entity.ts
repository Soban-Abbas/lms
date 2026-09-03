import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne } from "typeorm";
import { Assignment } from "src/assignment/assignment.entity";
import { Student } from "src/students/students.entity";
@Entity()
export class Submission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    fileUrl: string;

    @CreateDateColumn()
    submittedAt: Date;

    @ManyToOne(() => Student)
    student: Student;

    @ManyToOne(() => Assignment)
    assignment: Assignment;
}