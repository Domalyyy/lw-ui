FROM node:alpine AS lw-ui

WORKDIR /app

COPY . .

RUN npm ci && npm run build

FROM nginx:alpine

COPY --from=lw-ui /app/dist/lw-ui /usr/share/nginx/html

HEALTHCHECK --interval=30s --retries=5 --start-period=10s CMD service nginx status || exit 1

EXPOSE 80
