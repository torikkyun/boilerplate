FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@latest-10

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY prisma ./prisma
COPY src ./src

RUN pnpm install
RUN pnpm dlx prisma generate
RUN pnpm dlx prisma db push
RUN pnpm run build

FROM builder AS release

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 2412

CMD ["pnpm", "start:prod"]
