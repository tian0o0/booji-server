FROM node:lts-alpine as build

COPY . ./admin

WORKDIR /admin

RUN npm install --registry https://registry.npm.taobao.org && npm run build

# web server
FROM nginx:stable-alpine

COPY --from=build /admin/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /admin/dist /usr/share/nginx/html