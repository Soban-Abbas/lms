import { Controller, Post, Body, UseGuards,Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() body: { name: string; email: string; password: string; role: 'teacher' | 'student' }) {
        return this.authService.register(body.name, body.email, body.password, body.role);
    }

    @Post('login')
    login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('student')
getProfile(@Req() req){
    return req.user
}
}