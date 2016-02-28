FROM node:0

ADD . /app
WORKDIR /app

RUN npm install

CMD [ "node", "index.js" ]
