# Build stage
FROM node:24-alpine3.20 AS builder
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM caddy:latest
COPY --from=builder /app/dist /app/dist
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]