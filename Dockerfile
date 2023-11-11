FROM node:18.18.2-alpine3.17 

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["http-server", "dist", "-a", "172.18.0.2", "-p", "3001"]
