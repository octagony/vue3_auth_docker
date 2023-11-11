FROM node:18.18.2-alpine3.17 

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["http-server", "dist", "-a", "172.24.0.2", "-p", "3001"]
