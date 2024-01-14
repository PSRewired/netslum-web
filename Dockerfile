FROM node:lts as base

RUN npm i -g pnpm

FROM base as dependencies

WORKDIR /deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base as builder

ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /srv
COPY . .
COPY --from=dependencies /deps/node_modules ./node_modules

RUN pnpm exec next telemetry status disable
RUN pnpm run build 

RUN ls -la

FROM base as runner

ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /srv
ENV NODE_ENV production

COPY --from=builder /srv/.next/standalone/ .
COPY --from=builder /srv/public/ ./public/
COPY --from=builder /srv/.next/static ./public/_next/static/

EXPOSE 3000
CMD ["node",  "server.js"]
