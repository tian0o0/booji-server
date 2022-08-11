FROM node:lts-alpine

COPY . /

WORKDIR /

RUN npm install --force --registry https://registry.npm.taobao.org

CMD npm run start