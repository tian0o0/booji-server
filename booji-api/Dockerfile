FROM node:lts

COPY . /api

WORKDIR /api

RUN npm i -g @nestjs/cli pm2 --registry https://registry.npm.taobao.org \
  && npm install --registry https://registry.npm.taobao.org \
  && npm run build

CMD npm run start:test