FROM alpine:latest

WORKDIR /var/www/react_docker

RUN apk add --no-cache nodejs npm
RUN npm install --global yarn

ENTRYPOINT exec sh .docker/script/deploy.sh
