import { Controller, Req, Post, UseGuards,UseInterceptors, Body } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Param, UploadedFile } from '@nestjs/common';
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CreateAssignmentDto } from './pipes/create-assignment.dto';


@Controller('assignment')
export class AssignmentController {
    constructor(private assignmentService:AssignmentService){}


    @Post(':classroomId')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('teacher')

    @UseInterceptors(FileInterceptor('file'))
    createAssignment(
        @Param('classroomId') classroomId: string,
        @Body() body:CreateAssignmentDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10 MB
                    new FileTypeValidator({ fileType: '.(pdf|word)' }),
                    
                ],
                fileIsRequired:false
            }),
        )
        file ? :Express.Multer.File,
        @Req() req,
    ) {
        console.log(body,req)
        console.log(classroomId)
   console.log(file)
    }
}
