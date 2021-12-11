FROM node:16-alpine

WORKDIR /home/node/app

COPY package.json .

RUN yarn install --quiet --dev

COPY . .
RUN yarn build

ENV PORT 80
EXPOSE 80

CMD ["yarn", "start"]
