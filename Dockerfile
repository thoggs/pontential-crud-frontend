FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app

RUN npm install -g npm@latest

RUN npm install -g corepack
RUN corepack enable
RUN corepack prepare yarn@latest --activate

COPY package.json yarn.lock* .yarnrc.yml ./
RUN yarn set version stable && yarn

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN mkdir -p /app/.next/cache/images && chown -R node:node /app/.next/cache

RUN yarn set version stable && yarn build

FROM base AS runner

RUN apk add --no-cache curl

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app

USER nextjs

ENV HOSTNAME 0.0.0.0
EXPOSE 3000

CMD ["node", "server.js"]
