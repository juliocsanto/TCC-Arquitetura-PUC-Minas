FROM node:16
WORKDIR /usr/src/app
COPY package*.json / 
RUN npm i -g npm@8.3.2 && npm ci
EXPOSE 3000
# CMD ["node","./src/index.js"]