FROM node:22-alpine

WORKDIR /app

COPY index.html ./
COPY server.js ./

EXPOSE 8080

CMD ["node", "server.js"]
