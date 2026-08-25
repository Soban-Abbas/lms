import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
@Controller('teachers')
export class TeachersController {
    @Get('/register')
    register
}
