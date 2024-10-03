FROM node:alpine

WORKDIR /postServicesdoc
COPY package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm", "start" ]
