import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommunitiesModule } from './communities/communities.module';
import { EventsModule } from './events/events.module';
import { PostsModule } from './posts/posts.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  controllers: [AppController],
  imports: [
    // 🔧 Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // 🚦 Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute
    }]),
    
    // 🗄️ Database
    PrismaModule,
    
    // 🏗️ Feature modules
    AuthModule,
    UsersModule,
    CommunitiesModule,
    EventsModule,
    PostsModule,
    MessagesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
