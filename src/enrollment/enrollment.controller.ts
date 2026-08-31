import { Body, Controller,Post,Req,Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { EnrollmentService } from './enrollment.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('enrollment')
export class EnrollmentController {
    constructor ( private  enrollmentService:EnrollmentService){}
@Post()
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('student')
joinclassRoom(@Body() body:{joiningCode} , @Req() req){
return this.enrollmentService.joinclassRoom(body.joiningCode,req.user.id)
}

@Get()
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('student')
enrollments(@Req() req){
return this.enrollmentService.allEnrollments(req.user.id)
}

}
