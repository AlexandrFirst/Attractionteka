FROM node:19-alpine

RUN apk update

ADD . .

CMD ["npm", "start"]

EXPOSE 3000
