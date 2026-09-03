import { Controller,Get, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SubmissionService } from './submission.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('submission')
export class SubmissionController {
    constructor(private submissionService :SubmissionService){}
    @Post(":assignmentId")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('student')
    @UseInterceptors(FileInterceptor('file'))
    submitAssignment(@Param('assignmentId') assignmentId: string, @Req() req,
     @UploadedFile(
        new ParseFilePipe({
        validators:[
            new MaxFileSizeValidator({
                maxSize:10*1024*1024
            }),
            new FileTypeValidator({
                fileType:'.(pdf|doc|docx)'
            })
        ],
        fileIsRequired:true
    })
)
        file: Express.Multer.File,

){
    return this.submissionService.submitAssignment(assignmentId,req.user.id,file)
}
    @Get(':classroomId')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('teacher','student')
    getAssignments(@Param("classroomId") classroomId:string,@Req() req){
        return this.submissionService.getSolvedAssignments(classroomId,req.user.id,req.user.role)
    }

}
