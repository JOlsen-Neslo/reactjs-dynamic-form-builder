### STAGE 1: Build ###
FROM node:latest as build-stage

WORKDIR /app
COPY .docker/dist.env /app/.env
COPY package.json /app/
COPY yarn.lock /app/

ENV NODE_ENV 'production'

RUN yarn

COPY ./ /app/
RUN yarn build

### STAGE 2: Server Setup ###
FROM nginx:latest

COPY .docker/nginx/default.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/build/ /usr/share/nginx/html
