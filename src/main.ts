import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

function registerOpenApiJsonAlias(
  app: { getHttpAdapter: () => { getInstance: () => unknown } },
  document: OpenAPIObject,
) {
  const instance = app.getHttpAdapter().getInstance() as {
    get?: (path: string, handler: (req: unknown, res: { json: (b: unknown) => void }) => void) => void;
  };
  if (typeof instance?.get !== 'function') {
    return;
  }
  instance.get('/api-json', (_req, res) => {
    res.json(document);
  });
}

async function bootstrap() {
  // ✅ port déclaré en premier
  const port = process.env.PORT || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  const app = await NestFactory.create(AppModule);

  const expressApp = app.getHttpAdapter().getInstance() as {
    set?: (key: string, value: unknown) => void;
  };
  if (isProd && process.env.TRUST_PROXY === '1' && typeof expressApp?.set === 'function') {
    expressApp.set('trust proxy', 1);
  }

  // 🛡️ Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 🌐 CORS
  app.enableCors({
    origin: isProd ? true : (process.env.CORS_ORIGIN || 'http://localhost:19000'),
    credentials: true,
  });

  // 📚 OpenAPI + Swagger UI (dev et prod — spec JSON pour clients mobiles / codegen)
  const docBuilder = new DocumentBuilder()
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
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    jsonDocumentUrl: 'api/docs-json',
    swaggerUiEnabled: true,
  });

  registerOpenApiJsonAlias(app, document);

  const host = isProd ? (publicApiUrl ?? '(URL publique)') : `http://localhost:${port}`;
  console.log(`📚 Swagger UI: ${host}/api/docs`);
  console.log(`📄 OpenAPI JSON: ${host}/api/docs-json | ${host}/api-json`);

  // 🚀 Start server
  await app.listen(port);

  console.log(`🎨 Chill Backend API running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();