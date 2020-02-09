FROM node:12-alpine
RUN apk add --no-cache make gcc g++ python && \
  npm rebuild bcrypt --build-from-source
