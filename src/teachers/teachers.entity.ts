import { Classroom } from 'src/classroom/classroom.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToMany, OneToMany, } from 'typeorm';

@Entity('teachers')
export class Teacher {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: false })
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Classroom, (classroom) => classroom.teacher)
    classrooms:Classroom[]

}