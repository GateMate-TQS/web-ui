FROM node:21-alpine

WORKDIR /web-ui/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8083

CMD [ "npm", "run", "dev" ]