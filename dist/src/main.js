"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:19000',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Chill API')
        .setDescription('API pour l\'application Chill - Connectez-vous autour de vos passions')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('auth', 'Authentification')
        .addTag('users', 'Utilisateurs')
        .addTag('communities', 'Communautés')
        .addTag('events', 'Événements')
        .addTag('posts', 'Publications')
        .addTag('messages', 'Messages')
        .addTag('notifications', 'Notifications')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🎨 Chill Backend API running on port ${port}`);
    console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();
//# sourceMappingURL=main.js.map