import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { error } from 'console';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({


    exceptionFactory:(error)=>{


      error.forEach(err=>{

      })

    }



  }))
  await app.listen(process.env.PORT ?? 3000,()=>{
    console.log("app started on port 3000")
  });
}
bootstrap();
