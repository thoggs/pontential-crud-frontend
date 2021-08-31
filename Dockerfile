FROM nginx:alpine

WORKDIR /var/www/react_docker

RUN apk add --update nodejs npm git
RUN npm install --global yarn

COPY nginx/default.conf /etc/nginx/conf.d
#COPY package.json /var/www/react_docker
#COPY yarn.lock /var/www/react_docker
#COPY . .
#
#RUN yarn install --silent && yarn build


##RUN sh developer.sh
