FROM node:lts-alpine AS base

WORKDIR /app

ARG NEXT_PUBLIC_BASE_URL

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

FROM base AS deps

COPY package.json yarn.lock* .yarnrc.yml ./

RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN mkdir -p /app/.next/cache/images && chown -R node:node /app/.next/cache

RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn build

FROM base AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app

USER nextjs

ENV HOSTNAME 0.0.0.0

EXPOSE 3000

CMD ["node", "server.js"]