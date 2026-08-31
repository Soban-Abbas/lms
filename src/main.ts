import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError:true,
      // extra field bheje to error do ("extra should not exist")
      exceptionFactory: (errors) => {
        const formattedErrors: Record<string, string[]> = {};

        errors.forEach((error) => {
          formattedErrors[error.property] = Object.values(error.constraints || {});
        });

        return new UnprocessableEntityException({
          success: false,
          statusCode: 422,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );



  await app.listen(process.env.PORT ?? 3000,()=>{
    console.log("app started on port 3000")
  });
}
bootstrap();
