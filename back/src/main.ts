import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    
    const config = new DocumentBuilder()
        .setTitle('Eface')
        .setDescription('Eface API')
        .setVersion('1.0')
        //.addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/doc', app, document);

    await app.listen(3000);
}
bootstrap();