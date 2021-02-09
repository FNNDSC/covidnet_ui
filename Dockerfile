FROM node:12 as builder

WORKDIR /app

COPY yarn.lock .
COPY package.json .
RUN ["yarn"]

COPY . .
RUN ["yarn", "build"]

FROM node:12-alpine

RUN yarn global add sirv-cli

WORKDIR /app
COPY --from=builder /app/build .

USER 65536
EXPOSE 3000

CMD ["sirv", "--single", "--etag", "--host", "--port", "3000"]
