FROM node:12 as builder
ARG VUE_APP_GRAPHQL_API=http://terminal-api.rb24.ru
RUN mkdir -p /src/src
COPY public /src/public
COPY src /src/src
COPY .env /src
COPY babel.config.js /src
COPY package-lock.json /src
COPY package.json /src
COPY ecosystem.js /src
COPY .browserslistrc /src
COPY .eslintrc.js /src
WORKDIR /src
RUN VUE_APP_GRAPHQL_API=$VUE_APP_GRAPHQL_API npm install && NODE_ENV=production npm run build && cp -R dist / && rm -rf /src

FROM nginx
WORKDIR /etc/nginx/conf.d
RUN rm default.conf
COPY docker-nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /dist .
