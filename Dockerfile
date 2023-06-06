FROM node:20-bullseye as deps

WORKDIR /home/node/app

COPY yarn.lock .
COPY package.json .

RUN yarn install --quiet --dev

FROM node:20-bullseye as runner

COPY --from=deps /home/node/app/node_modules node_modules
COPY . .
RUN yarn codegen
RUN yarn build

ENV PORT 80
ENV NODE_ENV production
EXPOSE 80

CMD ["yarn", "start"]
