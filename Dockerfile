FROM node:18.18.2-alpine3.17 

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

CMD [ "npm" , "run", "dev" ] 
