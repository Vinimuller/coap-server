FROM node:18-alpine

COPY src/server.js /app/
COPY src/package.json . /app/
COPY .env /app/
COPY .keys/* /app/.keys/

WORKDIR /app

RUN npm install

CMD ["node", "src/server.js"]

EXPOSE 5683/udp