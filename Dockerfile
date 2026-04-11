FROM node:20-slim

# Dépendances système pour Prisma 
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm ci

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:migrate"]