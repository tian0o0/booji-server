FROM node:16

COPY . ./booji/admin

WORKDIR /booji/admin

RUN npm install --registry https://registry.npm.taobao.org

CMD npm start