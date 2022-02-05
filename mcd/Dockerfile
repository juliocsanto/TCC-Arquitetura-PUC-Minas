FROM node:lts

RUN chmod o+r /etc/resolv.conf
WORKDIR /usr/src/app_mcd

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY package*.json / 
RUN npm i npm
RUN npm i npm && npm ci

EXPOSE 3005

# CMD ["npm","run","start"]