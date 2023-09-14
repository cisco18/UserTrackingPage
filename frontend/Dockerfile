FROM node:18

WORKDIR /src

COPY package*.json ./

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs npm

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]