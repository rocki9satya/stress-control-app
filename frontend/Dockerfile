# frontend/Dockerfile

FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g pm2
ENV PATH=/app/node_modules/.bin:$PATH

EXPOSE 5173

CMD ["pm2-runtime", "pm2.config.js"]