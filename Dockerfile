### STAGE 1: Build ###
FROM node:14.16.0-stretch as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV GENERATE_SOURCEMAP=false

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx:1.19.8-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]