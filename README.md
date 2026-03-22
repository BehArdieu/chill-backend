# 🎨 Chill Backend API - NestJS

## 📱 Vue d'ensemble
Backend API moderne pour l'application Chill - Connectez-vous autour de vos passions.

## 🚀 Stack Technologique

### Backend
- **NestJS** - Framework Node.js moderne
- **TypeScript** - Langage typé
- **Prisma ORM** - Base de données
- **JWT** - Authentification
- **Swagger** - Documentation API
- **Class Validator** - Validation des données

### Base de données
- **PostgreSQL** (via Supabase)
- **PostGIS** (Géolocalisation)

## 🛠️ Installation

### Prérequis
- Node.js 18+
- Compte Supabase
- PostgreSQL avec PostGIS

### Setup
```bash
# Installer les dépendances
npm install

# Configurer l'environnement
cp env.example .env
# Éditer .env avec vos clés Supabase

# Générer le client Prisma
npm run db:generate

# Synchroniser la base de données
npm run db:push

# Démarrer en développement
npm run start:dev
```

## 🔧 Scripts

```bash
# Développement
npm run start:dev        # Démarrer avec hot reload
npm run start:debug      # Démarrer en mode debug

# Production
npm run build           # Compiler TypeScript
npm run start:prod      # Démarrer en production

# Base de données
npm run db:generate     # Générer le client Prisma
npm run db:push         # Synchroniser avec la DB
npm run db:migrate      # Créer une migration
npm run db:studio       # Interface Prisma Studio

# Tests
npm run test            # Tests unitaires
npm run test:e2e        # Tests end-to-end
npm run test:cov        # Couverture de tests
```

## 🛣️ API Routes

### Authentification
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `GET /auth/me` - Profil utilisateur
- `POST /auth/refresh` - Renouveler le token

### Utilisateurs
- `GET /users/:id` - Profil utilisateur
- `PUT /users/:id` - Modifier le profil
- `GET /users/search` - Rechercher des utilisateurs
- `GET /users/:id/communities` - Communautés de l'utilisateur
- `GET /users/:id/events` - Événements de l'utilisateur

### Communautés
- `GET /communities` - Liste des communautés
- `GET /communities/:id` - Détails d'une communauté
- `POST /communities` - Créer une communauté
- `POST /communities/:id/join` - Rejoindre une communauté
- `DELETE /communities/:id/leave` - Quitter une communauté
- `GET /communities/:id/members` - Membres d'une communauté

### Événements
- `GET /events` - Liste des événements
- `GET /events/:id` - Détails d'un événement
- `POST /events` - Créer un événement
- `POST /events/:id/join` - Participer à un événement
- `DELETE /events/:id/leave` - Ne plus participer
- `GET /events/:id/participants` - Participants d'un événement

### Posts
- `GET /posts` - Liste des posts
- `GET /posts/:id` - Détails d'un post
- `POST /posts` - Créer un post
- `POST /posts/:id/react` - Réagir à un post
- `DELETE /posts/:id/react` - Supprimer une réaction
- `DELETE /posts/:id` - Supprimer un post

### Messages
- `GET /messages/conversations` - Conversations
- `GET /messages/:userId` - Messages avec un utilisateur
- `POST /messages` - Envoyer un message
- `PUT /messages/:id/read` - Marquer comme lu
- `GET /messages/unread/count` - Nombre de messages non lus
- `DELETE /messages/:id` - Supprimer un message

### Notifications
- `GET /notifications` - Liste des notifications
- `PUT /notifications/:id/read` - Marquer comme lue
- `PUT /notifications/read-all` - Marquer toutes comme lues
- `GET /notifications/unread/count` - Nombre de notifications non lues
- `DELETE /notifications/:id` - Supprimer une notification
- `DELETE /notifications/all` - Supprimer toutes les notifications

## 📚 Documentation API

### Swagger UI
Une fois le serveur démarré en local, accédez à la documentation interactive :
```
http://localhost:3000/api/docs
```

**Production (Railway)** : [https://chill-backend-production.up.railway.app/api/docs](https://chill-backend-production.up.railway.app/api/docs)

### Authentification
```bash
# Headers requis
Authorization: Bearer <jwt_token>
```

## 🔐 Sécurité

- **JWT Authentication** - Tokens sécurisés
- **Rate Limiting** - Protection contre le spam
- **CORS** - Configuration des origines
- **Validation** - Validation automatique des données
- **Guards** - Protection des routes

## 🌍 Variables d'environnement

```env
# Base de données
DATABASE_URL="postgresql://..."
SUPABASE_URL="https://..."
SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# Serveur
PORT=3000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:19000"
```

## 🏗️ Architecture

### Modules
- **AuthModule** - Authentification
- **UsersModule** - Gestion des utilisateurs
- **CommunitiesModule** - Communautés
- **EventsModule** - Événements
- **PostsModule** - Publications
- **MessagesModule** - Messagerie
- **NotificationsModule** - Notifications

### Services
- **PrismaService** - Base de données
- **AuthService** - Authentification
- **JwtStrategy** - Stratégie JWT
- **Guards** - Protection des routes

## 🚀 Déploiement

### Production
```bash
# Build
npm run build

# Start
npm run start:prod
```

### Docker (optionnel)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 📝 Avantages NestJS

- ✅ **Architecture modulaire** - Code organisé
- ✅ **Décorateurs** - Code plus propre
- ✅ **Dependency Injection** - Meilleure gestion des dépendances
- ✅ **Guards & Interceptors** - Sécurité intégrée
- ✅ **Swagger automatique** - Documentation auto-générée
- ✅ **TypeScript first** - Support TypeScript natif
- ✅ **Scalabilité** - Prêt pour la croissance

## 🎯 Fonctionnalités

### Authentification
- Inscription/Connexion
- JWT tokens
- Refresh tokens
- Protection des routes

### Gestion des données
- CRUD complet
- Relations complexes
- Validation automatique
- Pagination

### Sécurité
- Rate limiting
- CORS configuré
- Validation des données
- Gestion des erreurs

---

*"Parce que tout le monde a une passion à partager"* 🎨✨