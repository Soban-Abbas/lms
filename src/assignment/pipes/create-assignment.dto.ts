import { IsString, IsNotEmpty, IsOptional, IsDateString,MinDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateAssignmentDto {
    @IsString({message:"title should be string"})
    @IsNotEmpty({message:"title should not be empty"})
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @Type(()=>Date)
    @MinDate(() => new Date(), { message: 'dueDate must be a future date' })
    dueDate: string;
}