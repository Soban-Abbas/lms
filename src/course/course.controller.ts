import { Controller, Post, UseGuards, Body, Req,Get, Query } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) { }
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('teacher')
    registerCourse(@Body() body: { title: string, description: string }, @Req() req) {
        return this.courseService.registerCourse(body.title, body.description, req.user.id)
    }



    @Get()
    getCourses(@Query() query :any){
        return this.courseService.getCourse(query)
    }
}
