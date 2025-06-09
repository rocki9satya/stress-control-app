# backend/Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --production
RUN npm install -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "pm2.config.js"]
