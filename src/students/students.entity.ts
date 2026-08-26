import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Student {
    @PrimaryColumn('uuid')
    id: string; // Supabase auth.users.id yahan store hogi

    @Column()
    name: string;

    @Column({unique:true})
    email: string;
@Column()
role:string ;
    @CreateDateColumn()
    createdAt: Date;

    // Baad mein: @OneToMany(() => Enrollment, ...) yahan add hoga
}