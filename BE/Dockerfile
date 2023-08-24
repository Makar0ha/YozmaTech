FROM node:17-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
COPY .env /app/.env
EXPOSE 3003

CMD [ "npm", "start"]