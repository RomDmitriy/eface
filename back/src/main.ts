import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('./cert/private-key.pem'),
        cert: fs.readFileSync('./cert/public-certificate.pem'),
    };

    const app = await NestFactory.create(AppModule, {httpsOptions});

    
    const config = new DocumentBuilder()
        .setTitle('Eface')
        .setDescription('Eface API')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);

    app.enableCors();

    await app.listen(3000);
}
bootstrap();
