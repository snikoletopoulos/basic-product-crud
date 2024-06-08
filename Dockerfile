FROM node:20-alpine as build

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm ci

COPY . .

RUN npm run build

ENV PORT=3000
ENV DATABASE_URL=""

EXPOSE $PORT

CMD [ "npm", "run", "start" ]
