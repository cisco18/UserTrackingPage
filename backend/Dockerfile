FROM node:18

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "/src/src/server.js"]