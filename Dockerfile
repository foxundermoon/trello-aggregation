FROM node:8

WORKDIR /app

COPY . /app

RUN  npm install && npm run build
CMD npm start
