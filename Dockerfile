#Step 1: Build the app in image 'builder'
FROM node:21-alpine3.18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk update && \
  apk add build-base libheif vips-dev vips -q
RUN npm install

COPY . .

RUN npx prisma generate

RUN npx nest build 

#Step 2: Copy the build from 'builder' to 'runner'
FROM node:21-alpine3.18

WORKDIR /app

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
  apk update && \
  apk add build-base libheif vips-dev vips -q

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
