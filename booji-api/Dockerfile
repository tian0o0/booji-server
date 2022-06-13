FROM node:lts

COPY . /api

WORKDIR /api

RUN npm install --force --registry https://registry.npm.taobao.org

CMD npm run start:test