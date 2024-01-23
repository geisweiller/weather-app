FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

COPY server.js .

RUN pnpm run docker-build

EXPOSE 8000

CMD ["node", "server.js"]
