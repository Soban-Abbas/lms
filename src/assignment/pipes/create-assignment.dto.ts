import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateAssignmentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsDateString()
    dueDate: string;
}