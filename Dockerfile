FROM node:21-alpine

WORKDIR /var/www/html

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["node", "index.js"]