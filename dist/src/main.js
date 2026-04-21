"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
function registerOpenApiJsonAlias(app, document) {
    const instance = app.getHttpAdapter().getInstance();
    if (typeof instance?.get !== 'function') {
        return;
    }
    instance.get('/api-json', (_req, res) => {
        res.json(document);
    });
}
async function bootstrap() {
    const port = process.env.PORT || 3000;
    const isProd = process.env.NODE_ENV === 'production';
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const expressApp = app.getHttpAdapter().getInstance();
    if (isProd && process.env.TRUST_PROXY === '1' && typeof expressApp?.set === 'function') {
        expressApp.set('trust proxy', 1);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: isProd ? true : (process.env.CORS_ORIGIN || 'http://localhost:19000'),
        credentials: true,
    });
    const docBuilder = new swagger_1.DocumentBuilder()
        .setTitle('Chill API')
        .setDescription("API pour l'application Chill - Connectez-vous autour de vos passions")
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('auth', 'Authentification')
        .addTag('users', 'Utilisateurs')
        .addTag('communities', 'Communautés')
        .addTag('events', 'Événements')
        .addTag('posts', 'Publications')
        .addTag('messages', 'Messages')
        .addTag('notifications', 'Notifications')
        .addTag('health', 'Santé');
    const publicApiUrl = process.env.PUBLIC_API_URL?.replace(/\/$/, '');
    if (publicApiUrl) {
        docBuilder.addServer(publicApiUrl);
    }
    const config = docBuilder.build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        jsonDocumentUrl: 'api/docs-json',
        swaggerUiEnabled: true,
    });
    registerOpenApiJsonAlias(app, document);
    const host = isProd ? (publicApiUrl ?? '(URL publique)') : `http://localhost:${port}`;
    console.log(`📚 Swagger UI: ${host}/api/docs`);
    console.log(`📄 OpenAPI JSON: ${host}/api/docs-json | ${host}/api-json`);
    await app.listen(port);
    console.log(`🎨 Chill Backend API running on port ${port}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();
//# sourceMappingURL=main.js.map