FROM node

WORKDIR /app

COPY . .

CMD ["yarn", "start:dev"]