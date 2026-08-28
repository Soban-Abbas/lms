import { Controller, Post, UseGuards, Body, Req,Get } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ClassroomService } from './classroom.service';

@Controller('classroom')
export class classroomController {
    constructor(private classroomService: ClassroomService) { }
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('teacher')
    registerClassroom(@Body() body: {title: string, description: string }, @Req() req) {
        return this.classroomService.registerClassroom(body.title, body.description, req.user.id)
    }

@Get()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('teacher','student')
getClassroom(@Req() req){
return this.classroomService.getClassroom(req.user.id)
}

   
}
