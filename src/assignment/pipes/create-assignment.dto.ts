import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateAssignmentDto {
    @IsString({message:"title should be string"})
    @IsNotEmpty({"message":"title should not be empty"})
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsDateString()
    dueDate: string;
}