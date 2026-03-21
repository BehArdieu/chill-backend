FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

RUN npx prisma generate

# --- Image finale ---
FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# Copier le build et les fichiers nécessaires
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "run", "start:migrate"]