FROM node:22-alpine

WORKDIR /app/backend

COPY backend/ .

RUN npm install

EXPOSE 5000

CMD ["node", "src/server.js"]
