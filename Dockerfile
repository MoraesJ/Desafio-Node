FROM node:16 as builder

WORKDIR /usr/src/app

RUN apt-get update  && apt-get install -y wget

COPY . .

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000

CMD ["node", "index.js"]