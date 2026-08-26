import { Module } from '@nestjs/common';
import { Student } from './students.entity';
import { TypeOrmModule } from '@nestjs/typeorm'
import { StudentService } from './students.service';

@Module({
    imports:[TypeOrmModule.forFeature([Student])],
    providers:[StudentService],
    exports:[StudentService]
})
export class StudentsModule {}
