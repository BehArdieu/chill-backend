import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // ✅ port déclaré en premier
  const port = process.env.PORT || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  const app = await NestFactory.create(AppModule);

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

  // 📚 Swagger — uniquement hors production
  if (!isProd) {
    const config = new DocumentBuilder()
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
      .addTag('health', 'Santé')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
  }

  // 🚀 Start server
  await app.listen(port);

  console.log(`🎨 Chill Backend API running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();