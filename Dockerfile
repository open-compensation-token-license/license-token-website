# Stage 1 - Building the app
FROM node:lts as builder
ENV CI=true

WORKDIR /site
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production --output-path=dist --base-href="/"


# Stage 2 - creating a webserver with the app
FROM nginx:alpine

RUN \
  apk upgrade --update-cache --available && \
  apk add --update ca-certificates wget rsync && \
  rm -rf /var/lib/apk/lists/* && \
  rm -rf /usr/share/nginx/html/* && \
  rm /var/cache/apk/*

COPY --from=builder /site/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

