FROM node:20-alpine

# Dépendances système pour Prisma + OpenSSL
RUN apk add --no-cache openssl

WORKDIR /app

# Copier TOUT d'abord (schema.prisma doit être présent)
COPY . .

# Installer TOUTES les dépendances (dev inclus pour le build)
RUN npm ci

# Build NestJS
RUN npm run build

# Générer le client Prisma
RUN npx prisma generate

# Supprimer les devDependencies après le build
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start:migrate"]