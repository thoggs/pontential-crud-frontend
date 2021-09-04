FROM nginx:alpine

WORKDIR /var/www/react_docker

COPY .docker/nginx/default.conf /etc/nginx/conf.d
COPY . .

RUN apk add --no-cache nodejs npm vim
RUN npm install --global yarn
RUN yarn install
RUN yarn build

COPY . .


